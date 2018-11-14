import {TimeSpan} from '../../../utils/date/dateTypes';
import {
    cleanMilliSecondsAndSeconds,
    getBeginningOfTheDay,
    getBeginningOfTheMonth,
    getBeginningOfTheWeek
} from '../../../utils/date/date';
import {updateObject} from '../../utilities';
import {IDataReducerState} from './index';
import {DataSet} from '../../../utils/data/apiGraph';
import merge from 'deepmerge';
import {IApiGraph} from '../../../utils/data/dataTypes';

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

    fetchApiGraphDataStart: (state: IDataReducerState) => {

        return updateObject(state, {
            loading: updateObject(state.loading, {
                partial: true,
            }),
            error: updateObject(state.error, {
                status: false,
                message: null as string,
            })
        });
    },
    fetchApiGraphDataSuccess: (state: IDataReducerState, action: any) => {
        const typesOfData: DataSet[] = action.payload.typesOfData;

        const datasets: any = {};

        typesOfData.forEach((typeOfData, index: number) => {
            const existingData = state.dataset[typeOfData];
            const newData = action.payload.data[index].data;

            let data: IApiGraph;
            if (existingData) {
                let mergeOrder: any[];

                // TODO: add extra check for finding duplicates when getting new data? (this shouldn't happen, but just to be sure)

                const existingDataMustComeAfterNewData =
                    newData.weeks[0].days[0].timestamp > existingData.weeks[existingData.weeks.length - 1].days[6].timestamp;
                if (existingDataMustComeAfterNewData) {
                    mergeOrder = [existingData, newData]
                } else {
                    mergeOrder = [newData, existingData]
                }
                data = merge.all(mergeOrder) as IApiGraph;
            } else {
                data = newData
            }
            datasets[typeOfData] = data;
        });

        return updateObject(state, {
            loading: updateObject(state.loading, {
                initial: false,
                partial: false
            }),
            dataset: updateObject(state.dataset, datasets)
        });

    },

    fetchApiItemsDataStart: (state: IDataReducerState) => {
        return updateObject(state, {
            loading: updateObject(state.loading, { items: true })
        });
    },

    fetchApiItemsDataSuccess: (state: IDataReducerState, action: any) => {
        return updateObject(state, {
            loading: updateObject(state.loading, { items: false }),
            items: action.payload.data.data.items
        });
    },

    fetchApiGraphDataFailed: (state: IDataReducerState, action: any) => {
        return updateObject(state, {
            loading: updateObject(state.loading, {
                initial: false,
                partial: false,
                items: false
            }),
            error: updateObject(state.error, {
                status: true,
                error: action.payload.error,
                message: 'The data could not be retrieved!'
            })
        });
    }

};
