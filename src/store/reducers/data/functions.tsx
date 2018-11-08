import {TimeSpan} from '../../../utils/date/dateTypes';
import {
    beautifyDate,
    cleanMilliSecondsAndSeconds,
    getBeginningOfTheDay,
    getBeginningOfTheMonth,
    getBeginningOfTheWeek
} from '../../../utils/date/date';
import {updateObject} from '../../utilities';
import {IDataReducerState} from './index';
import {DataSet} from '../../../utils/data/data';
import merge from 'deepmerge';
import {IData} from '../../../utils/chart/chartTypes';

export default {
    setTimespanForGraphs: (state: IDataReducerState, action: any) => {
        return updateObject(state, {
            selected: updateObject(state.selected, {
                timeSpan: action.payload.timeSpan
            })
        });
    },
    setStartDateForGraphs: (state: IDataReducerState, action: any) => {
        let startDate = cleanMilliSecondsAndSeconds(action.payload.startDate);
        if (state.selected.timeSpan === TimeSpan.day) {
            startDate = getBeginningOfTheDay(startDate)
        } else if (state.selected.timeSpan === TimeSpan.week) {
            startDate = getBeginningOfTheWeek(startDate)
        } else {
            startDate = getBeginningOfTheMonth(startDate)
        }

        return updateObject(state, {
            selected: updateObject(state.selected, {
                graphStartDateTime: startDate
            })
        });
    },
    setCurrentDate: (state: IDataReducerState) => {
        return updateObject(state, {
            selected: updateObject(state.selected, {
                currentDateTime: new Date()
            })
        });
    },

    fetchDataStart: (state: IDataReducerState, action: any) => {
        const initialLoad: DataSet = action.payload.initialLoad;

        return updateObject(state, {
            loading: updateObject(state.loading, {
                initial: initialLoad,
                partial: !initialLoad,
            }),
            error: updateObject(state.error, {
                status: false,
                message: null as string,
            })
        });
    },
    fetchDataSuccess: (state: IDataReducerState, action: any) => {
        const typesOfData: DataSet[] = action.payload.typesOfData;

        const datasets: any = {};

        typesOfData.forEach((typeOfData, index: number) => {
            const existingData = state.dataset[typeOfData];
            const newData = action.payload.data[index].data;

            let data: IData;
            if (existingData) {
                let mergeOrder: any[];

                // TODO: add extra check for finding duplicates when getting new data? (this shouldn't happen, but just to be sure)

                if (newData.weeks[0].days[0].timestamp > existingData.weeks[existingData.weeks.length - 1].days[6].timestamp) {
                    console.log('new data must come after existing data');
                    mergeOrder = [existingData, newData]
                } else {
                    console.log('existing data must come after new data');
                    mergeOrder = [newData, existingData]
                }
                data = merge.all(mergeOrder) as IData;
            } else {
                data = newData
            }
            datasets[typeOfData] = data;

            /* DEBUG */
            console.log(
                'Amount of weeks in Redux store for',
                typeOfData,
                data.weeks.length,
                data.weeks.map((week: any) =>
                    beautifyDate(new Date(week.days[0].timestamp * 1000), '{DAY}/{MONTH_NR}') +
                    ' - ' +
                    beautifyDate(new Date(week.days[6].timestamp * 1000), '{DAY}/{MONTH_NR}')
                ));
            /* /DEBUG */
        });

        return updateObject(state, {
            loading: updateObject(state.loading, {
                initial: false,
                partial: false
            }),
            dataset: updateObject(state.dataset, datasets)
        });

    },

    fetchDataFailed: (state: IDataReducerState, action: any) => {
        return updateObject(state, {
            error: updateObject(state.error, {
                status: true,
                error: action.payload.error,
                message: 'The data could not be retrieved!'
            })
        });
    }
};
