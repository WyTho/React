import * as reduxStore from './reduxStore';
import {DataSet, getAllDatasets} from './apiGraph';
import {TimeSpan} from '../date/dateTypes';
import {IApiGraph} from './dataTypes';
import * as dateUtils from '../date/date';
import {addDays, getBeginningOfTheMonth, getBeginningOfTheWeek, subtractDays} from '../date/date';
import {getEndOfTheWeek} from '../date/date';

describe('reduxStore.tsx (utils)', () => {

    // Woensdag 21/11/2018 @ 12:43:37 (HH:MM:SS)
    const date = new Date(1542800617045);

    const mockApiGraphData = (timeSpan: TimeSpan, d: Date): IApiGraph => {
        let amountOfDummyWeeks = 1;

        if (timeSpan === TimeSpan.day) {
            d = dateUtils.getBeginningOfTheDay(d);
        } else if (timeSpan === TimeSpan.week) {
            d = dateUtils.getBeginningOfTheWeek(d);
        } else {
            d = dateUtils.getBeginningOfTheMonth(d);
            amountOfDummyWeeks = 25;
        }
        const data: IApiGraph = {
            id: 0,
            data_type: '',
            title: '',
            weeks: []
        };

        const randomValues = (): number[] => Array.from({length: 24}, () => Math.floor(Math.random() * 500) / 10);
        const startTimestamp = d.getTime();
        const oneHour = 3600000;
        const oneDay = oneHour * 24;

        for (let i = 0; i < (amountOfDummyWeeks * 7); i += 7) {
            data.weeks.push({
                days: [
                    { id: (startTimestamp + (i * oneDay)) / 1000,
                        timestamp: (startTimestamp + (i * oneDay)) / 1000,       values: randomValues() },
                    { id: (startTimestamp + ((i + 1) * oneDay)) / 1000,
                        timestamp: (startTimestamp + ((i + 1) * oneDay)) / 1000, values: randomValues() },
                    { id: (startTimestamp + ((i + 2) * oneDay)) / 1000,
                        timestamp: (startTimestamp + ((i + 2) * oneDay)) / 1000, values: randomValues() },
                    { id: (startTimestamp + ((i + 3) * oneDay)) / 1000,
                        timestamp: (startTimestamp + ((i + 3) * oneDay)) / 1000, values: randomValues() },
                    { id: (startTimestamp + ((i + 4) * oneDay)) / 1000,
                        timestamp: (startTimestamp + ((i + 4) * oneDay)) / 1000, values: randomValues() },
                    { id: (startTimestamp + ((i + 5) * oneDay)) / 1000,
                        timestamp: (startTimestamp + ((i + 5) * oneDay)) / 1000, values: randomValues() },
                    { id: (startTimestamp + ((i + 6) * oneDay)) / 1000,
                        timestamp: (startTimestamp + ((i + 6) * oneDay)) / 1000, values: randomValues() }
                ]
            })
        }

        return data
    };

    let store: any;
    beforeEach(() => {
        store = {
            getState: () => {
                const state: any = {
                    data: {
                        dataset: {}
                    }
                };
                getAllDatasets().forEach((dataSet: DataSet) => {
                    // Is a dataSet from 1 Nov until 25 weeks after 1 Nov
                    // It starts at the first of the month from the given date (21 Nov)
                    state.data.dataset[dataSet] = mockApiGraphData(TimeSpan.month, date)
                });
                return state
            }
        };
    });

    describe('getAllDatasets()', () => {
        const func = reduxStore.getMissingDataRange;

        it('should get around 60 days of missing data before 1 Nov', () => {
            expect(func(date, store)).toEqual({
                // 2018-09-16 00:00
                fromDate: getBeginningOfTheWeek(subtractDays(date, 60)),
                // 2018-10-31 00:00
                toDate: subtractDays(getBeginningOfTheMonth(date), 1)
            })
        });
        it('should get around 30 days of missing data before 1 Nov', () => {
            expect(func(addDays(date, 30), store)).toEqual({
                fromDate: getBeginningOfTheWeek(subtractDays(date, 30)),
                toDate: subtractDays(getBeginningOfTheMonth(date), 1)
            });
        });
        it('should get all dates from the last date in the dataSet until somewhere in Aug 2019 (on a sunday)', () => {
            const juneFirst2019 = new Date(1559347200000);

            const lastDateInDataset = new Date(1556146800000);

            expect(func(juneFirst2019, store)).toEqual({
                fromDate: lastDateInDataset,
                toDate: getEndOfTheWeek(addDays(juneFirst2019, 60))
            });
        });
        it('should return null if the data from 60 days before, and 60 days after the center date is already there', () => {
            expect(func(addDays(date, 60), store)).toEqual(null);
        });
        it('should return null if there is no data', () => {
            store = {
                getState: () => {
                    const state: any = {
                        data: {
                            dataset: {}
                        }
                    };
                    getAllDatasets().forEach((dataSet: DataSet) => {
                        state.data.dataset[dataSet] = null as IApiGraph
                    });
                    return state
                }
            };
            expect(func(addDays(date, 60), store)).toEqual(null);
        });
    });

});
