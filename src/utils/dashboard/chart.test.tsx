import * as chartUtils from './chart';
import {TimeSpan} from '../date/dateTypes';
import * as dateUtils from '../date/date';
import {IApiGraph} from '../data/dataTypes';
import {isNumber} from '../other';
import {createMuiTheme, Theme} from '@material-ui/core';
import * as colors from '@material-ui/core/colors';

describe('chart.tsx (utils)', () => {

    // Woensdag 21/11/2018 @ 12:43:37 (HH:MM:SS)
    const date = new Date(1542800617045);

    const today = new Date();

    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 90000);

    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 90000);

    const testableDates = [date, today, futureDate, pastDate];

    const mockApiGraphData = (timespan: TimeSpan, d: Date) => {
        let amountOfDummyWeeks = 1;

        if (timespan === TimeSpan.day) {
            d = dateUtils.getBeginningOfTheDay(d);
        } else if (timespan === TimeSpan.week) {
            d = dateUtils.getBeginningOfTheWeek(d);
        } else {
            d = dateUtils.getBeginningOfTheMonth(d);
            amountOfDummyWeeks = 5;
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
                    { id: i,     timestamp: (startTimestamp + (i * oneDay)) / 1000,       values: randomValues() },
                    { id: i + 1, timestamp: (startTimestamp + ((i + 1) * oneDay)) / 1000, values: randomValues() },
                    { id: i + 2, timestamp: (startTimestamp + ((i + 2) * oneDay)) / 1000, values: randomValues() },
                    { id: i + 3, timestamp: (startTimestamp + ((i + 3) * oneDay)) / 1000, values: randomValues() },
                    { id: i + 4, timestamp: (startTimestamp + ((i + 4) * oneDay)) / 1000, values: randomValues() },
                    { id: i + 5, timestamp: (startTimestamp + ((i + 5) * oneDay)) / 1000, values: randomValues() },
                    { id: i + 6, timestamp: (startTimestamp + ((i + 6) * oneDay)) / 1000, values: randomValues() }
                ]
            })
        }

        return data
    };

    describe('getLabelsForChart()', () => {
        const func = chartUtils.getLabelsForChart;

        it('should have the right amount of labels', () => {
            expect(func(TimeSpan.day, date)).toHaveLength(24);
            expect(func(TimeSpan.week, date)).toHaveLength(7);
            testableDates.forEach((d: Date) => {
                expect(func(TimeSpan.month, d)).toHaveLength(dateUtils.getEndOfTheMonth(d).getDate());
            })
        });

        it('should have the right labels', () => {
            const getExpectedLabels = (startingDate: Date, timespan: TimeSpan, millisecondsBetweenLabels: number) => {
                let amount;
                if (timespan === TimeSpan.day) {
                    startingDate = dateUtils.getBeginningOfTheDay(startingDate);
                    amount = 24
                } else if (timespan === TimeSpan.week) {
                    startingDate = dateUtils.getBeginningOfTheWeek(startingDate);
                    amount = 7
                } else {
                    startingDate = dateUtils.getBeginningOfTheMonth(startingDate);
                    amount = dateUtils.getEndOfTheMonth(startingDate).getDate()
                }

                const expected = [];
                for (
                    let timestamp = startingDate.getTime();
                    timestamp < (startingDate.getTime() + (amount * millisecondsBetweenLabels));
                    timestamp += millisecondsBetweenLabels
                ) {
                    expected.push(timestamp)
                }
                return expected;
            };

            const oneHour = 3600000;
            const oneDay = oneHour * 24;

            testableDates.forEach((d: Date) => {
                expect(
                    func(TimeSpan.day, d).map(x => (new Date(x)).getTime())
                ).toEqual(getExpectedLabels(d, TimeSpan.day, oneHour));
                expect(
                    func(TimeSpan.week, d).map(x => (new Date(x)).getTime())
                ).toEqual(getExpectedLabels(d, TimeSpan.week, oneDay));
                expect(
                    func(TimeSpan.month, d).map(x => (new Date(x)).getTime())
                ).toEqual(getExpectedLabels(d, TimeSpan.month, oneDay));
            })

        });
    });

    describe('getValuesForChart()', () => {
        const func = chartUtils.getValuesForChart;

        it('should have the right amount of values', () => {
            expect(
                func(TimeSpan.day, date, mockApiGraphData(TimeSpan.day, date))
            ).toHaveLength(24);
            expect(
                func(TimeSpan.week, date, mockApiGraphData(TimeSpan.week, date))
            ).toHaveLength(7);
            testableDates.forEach((d: Date) => {
                expect(
                    func(TimeSpan.month, d, mockApiGraphData(TimeSpan.month, d))
                ).toHaveLength(dateUtils.getEndOfTheMonth(d).getDate());
            })
        });
        it('should have the right values', () => {
            const getExpectedValues = (startingDate: Date, timeSpan: TimeSpan, data: IApiGraph) => {
                let epochTimestamp: number;
                if (timeSpan === TimeSpan.day) {
                    epochTimestamp = dateUtils.epochTimestamp(dateUtils.getBeginningOfTheDay(startingDate));
                } else if (timeSpan === TimeSpan.week) {
                    epochTimestamp = dateUtils.epochTimestamp(dateUtils.getBeginningOfTheWeek(startingDate));
                } else {
                    epochTimestamp = dateUtils.epochTimestamp(dateUtils.getBeginningOfTheMonth(startingDate));
                    // dateUtils.getEndOfTheMonth(startingDate).getDate()
                }

                if (timeSpan === TimeSpan.day) {
                    for (const day of data.weeks[0].days) {
                        if (day.timestamp === epochTimestamp) return day.values;
                    }
                } else {
                    const values: number[] = [];
                    const pushDay = (day: any) => {
                        const average = day.values.reduce((store: any, value: number, index: number) => {
                            if (value !== null) {
                                store.total += value;
                                store.avg = store.total / (index + 1);
                            }
                            return store
                        }, { total: 0, average: null }).avg;
                        values.push(isNumber(average) ? +average.toFixed(1) : null)
                    };

                    let needsToBeInValues;
                    let pushValue;
                    if (timeSpan === TimeSpan.week) {

                        needsToBeInValues = (day: any) => {
                            const dayDate = new Date(day.timestamp * 1000);
                            return dateUtils.getBeginningOfTheWeek(startingDate).getTime()
                                === dateUtils.getBeginningOfTheWeek(dayDate).getTime()
                        };
                        pushValue = (day: any) => pushDay(day)

                    } else {

                        needsToBeInValues = (day: any) => {
                            const dayDate = new Date(day.timestamp * 1000);
                            return dateUtils.getBeginningOfTheMonth(startingDate).getTime()
                                === dateUtils.getBeginningOfTheMonth(dayDate).getTime();
                        };
                        pushValue = (day: any) => pushDay(day)
                    }

                    for (const week of data.weeks) {
                        for (const day of week.days) {
                            if (needsToBeInValues(day)) pushValue(day)
                        }
                    }
                    return values
                }

                return []

            };
            testableDates.forEach((d: Date) => {
                const dataDay = mockApiGraphData(TimeSpan.day, d);
                expect(func(TimeSpan.day, d, dataDay))
                    .toEqual(getExpectedValues(d, TimeSpan.day, dataDay));

                const dataWeek = mockApiGraphData(TimeSpan.week, d);
                expect(func(TimeSpan.week, d, dataWeek))
                    .toEqual(getExpectedValues(d, TimeSpan.week, dataWeek));

                const dataMonth = mockApiGraphData(TimeSpan.month, d);
                expect(func(TimeSpan.month, d, dataMonth))
                    .toEqual(getExpectedValues(d, TimeSpan.month, dataMonth));
            })
        });
    });

    describe('getCurrentValue()', () => {
        const func = chartUtils.getCurrentValue;

        const getCurrentValueFromDummyData = (data2: IApiGraph) => {
            const now = dateUtils.getBeginningOfTheHour(new Date());
            for (const week of data2.weeks) {
                for (const day of week.days) {
                    if (day.timestamp * 1000 === dateUtils.getBeginningOfTheDay(now).getTime()) {
                        return (day.values[now.getHours()] || 0).toFixed(1);
                    }
                }
            }
        };

        it('should get the current value if it\'s in the dataset', () => {
            const data = mockApiGraphData(TimeSpan.day, today);
            expect(func(data)).toBe(getCurrentValueFromDummyData(data))
        });

        it('should get null if the data for the current hour is not in the dataset', () => {
            const twoMonthsAgo = new Date();
            twoMonthsAgo.setMonth(today.getMonth() - 2);

            const data = mockApiGraphData(TimeSpan.day, twoMonthsAgo);
            expect(func(data)).toBeNull()
        })
    });

    describe('getYAxisHeight()', () => {
        const func = chartUtils.getYAxisHeight;

        const data = mockApiGraphData(TimeSpan.day, today);
        it('should get the right height for the chart for a list of numeric values', () => {
            const highestValue = data.weeks[0].days[0].values.reduce((higest: number, x: number) => x > higest ? x : higest, 0);
            const lowestValue = data.weeks[0].days[0].values.reduce((lowest: number, x: number) => x < lowest ? x : lowest, highestValue);
            const expected = Math.floor(highestValue + ((highestValue - lowestValue) / 2) + 3);
            expect(func(data.weeks[0].days[0].values)).toBe(expected)
        });
        it('should set the height of the chart to - highestValue + ((highestValue - lowestValue) / 2) + 3', () => {
            const calculate = (highestValue: number, lowestValue: number) =>
                Math.floor(highestValue + ((highestValue - lowestValue) / 2) + 3);

            expect(func([1, 2, 3, 4, 5, 6, 7])).toBe(calculate(7, 1));
            expect(func([8, 324, 12312, 4, -65, 4234, 11])).toBe(calculate(12312, -65));
            expect(func([0, 0, 0])).toBe(calculate(0, 0));
        });
        it('should get a height of 3 for the chart if there are no values to be displayed', () => {
            expect(func([])).toBe(3)
        })
    });
    describe('createAnnotationsForTimeSpan()', () => {
        const func = chartUtils.createAnnotationsForTimeSpan;

        const mockLabels = (timespan: TimeSpan, d: Date) => {
            const labels: Date[] = [];
            const oneHour = 3600000;
            const oneDay = oneHour * 24;

            if (timespan === TimeSpan.day) {
                d = dateUtils.getBeginningOfTheDay(d);
                for (let i = d.getTime(); i < d.getTime() + (oneHour * 24); i += oneHour) {
                    labels.push(new Date(i))
                }
            } else if (timespan === TimeSpan.week) {
                d = dateUtils.getBeginningOfTheWeek(d);
                for (let i = d.getTime(); i < d.getTime() + (oneDay * 7); i += oneDay) {
                    labels.push(new Date(i))
                }
            } else {
                d = dateUtils.getEndOfTheMonth(d);
                for (let i = d.getTime(); i < d.getTime() + (oneDay * dateUtils.getEndOfTheMonth(d).getDate()); i += oneDay) {
                    labels.push(new Date(i))
                }
            }
            return labels
        };

        const mockTheme = () => createMuiTheme({
            palette: {
                primary: colors.teal,
                secondary: colors.blue
            },
            typography: {
                useNextVariants: true
            }
        });

        // const expectedAnnotations = (timespan: TimeSpan) => {
        //     const heightAnnotation: IAnnotation = {
        //         type: 'line',
        //         drawTime: 'beforeDatasetsDraw',
        //         mode: 'horizontal',
        //         scaleID: 'y-axis-0',
        //         value: 'no value defined',
        //         borderColor: 'transparent',
        //         borderWidth: 1,
        //         borderDash: [0, 0],
        //         // label: {
        //         //     backgroundColor: '',
        //         //     position: '',
        //         //     content: ''
        //         // }
        //     };
        //
        //     if (timespan === TimeSpan.day) {
        //         return [
        //             heightAnnotation
        //         ]
        //     }
        // }

        it('should create the correct day annotations of the times when the current day is not shown', () => {
            const now = new Date();
            const yesterday = new Date();
            yesterday.setDate(now.getDate() - 1);

            const timeSpan = TimeSpan.day;
            const labels = mockLabels(timeSpan, yesterday);
            const currentHour = dateUtils.getBeginningOfTheHour(now);
            const theme: Theme = mockTheme();
            const yAxesHeight = 20;

            const result = func(
                timeSpan,
                labels,
                currentHour,
                theme,
                yAxesHeight
            );

            expect(result).toHaveLength(4);

            // The first annotation should be invisible and should be set to create the height of the chart
            expect(result[0].borderColor).toBe('transparent');
            expect(result[0].value).toBe(yAxesHeight);
            expect(result[0].label).toBeFalsy();

            // The other annotations are visible
            expect(result[1].label.content).toBe('6:00');
            expect(result[2].label.content).toBe('12:00');
            expect(result[3].label.content).toBe('18:00');

            expect(result[4]).toBeFalsy();
        });
        it('should create the correct week annotations of the days when the current week is not shown', () => {
            const now = new Date();
            const lastWeek = new Date();
            lastWeek.setDate(now.getDate() - 7);

            const timeSpan = TimeSpan.week;
            const labels = mockLabels(timeSpan, lastWeek);
            const currentHour = dateUtils.getBeginningOfTheHour(now);
            const theme: Theme = mockTheme();
            const yAxesHeight = 20;

            const result = func(
                timeSpan,
                labels,
                currentHour,
                theme,
                yAxesHeight
            );

            expect(result).toHaveLength(6);

            // The first annotation should be invisible and should be set to create the height of the chart
            expect(result[0].borderColor).toBe('transparent');
            expect(result[0].value).toBe(yAxesHeight);
            expect(result[0].label).toBeFalsy();

            // The other annotations are visible
            expect(result[1].label.content).toBe('Di');
            expect(result[2].label.content).toBe('Wo');
            expect(result[3].label.content).toBe('Do');
            expect(result[4].label.content).toBe('Vr');
            expect(result[5].label.content).toBe('Za');

            expect(result[6]).toBeFalsy();
        });
        it('should create the correct month annotations of the days when the current month is not shown (november)', () => {
            const now = new Date();
            const november = new Date(date.getTime());
            november.setMonth(date.getMonth() - 12);

            const timeSpan = TimeSpan.month;
            const labels = mockLabels(timeSpan, november);
            const currentHour = dateUtils.getBeginningOfTheHour(now);
            const theme: Theme = mockTheme();
            const yAxesHeight = 20;

            const result = func(
                timeSpan,
                labels,
                currentHour,
                theme,
                yAxesHeight
            );

            expect(result).toHaveLength(6);

            // The first annotation should be invisible and should be set to create the height of the chart
            expect(result[0].borderColor).toBe('transparent');
            expect(result[0].value).toBe(yAxesHeight);
            expect(result[0].label).toBeFalsy();

            // The other annotations are visible
            expect(result[1].label.content).toBe('5');
            expect(result[2].label.content).toBe('10');
            expect(result[3].label.content).toBe('15');
            expect(result[4].label.content).toBe('20');
            expect(result[5].label.content).toBe('25');

            expect(result[6]).toBeFalsy();
        });
        it.skip('should handle annotation overlap of the "NOW" label if the current day is shown', () => {

        });
        it.skip('should handle annotation overlap of the "NOW" label if the current week is shown', () => {

        });
        it.skip('should handle annotation overlap of the "NOW" label if the current month is shown', () => {

        });
    });
});
