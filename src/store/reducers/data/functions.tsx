import {TimeSpan} from '../../../utils/date/dateTypes';
import {
    getBeginningOfTheDay,
    getBeginningOfTheMonth,
    getBeginningOfTheWeek
} from '../../../utils/date/date';
import {updateObject} from '../../utilities';
import {IDataReducerState} from './index';
import {DataSet} from '../../../utils/data/apiGraph';
import {IApiGraph} from '../../../utils/data/dataTypes';

import mergeForJest from 'deepmerge';
import * as mergeForTypescript from 'deepmerge';
const merge = mergeForJest || mergeForTypescript;

export default {
    setTimespanForGraphs: (state: IDataReducerState, action: any) => {
        return updateObject(state, {
            selected: updateObject(state.selected, {
                previouslySelectedTimeSpan: state.selected.timeSpan,
                timeSpan: action.payload.timeSpan
            })
        });
    },
    setStartDateForGraphs: (state: IDataReducerState, action: any) => {
        const { previouslySelectedTimeSpan, timeSpan, graphStartDateTime } = state.selected;

        let startDate = action.payload.startDate;

        const now = new Date();

        const getBeginningFor = (ts: TimeSpan, date: Date) => (
            ts === TimeSpan.day ? getBeginningOfTheDay(date) :
                ts === TimeSpan.week ? getBeginningOfTheWeek(date) :
                    getBeginningOfTheMonth(date)
        );

        if (
            previouslySelectedTimeSpan &&
            previouslySelectedTimeSpan !== timeSpan &&
            graphStartDateTime.getTime() === getBeginningFor(previouslySelectedTimeSpan, now).getTime()
        ) {
            startDate = getBeginningFor(timeSpan, now)
        }

        startDate = getBeginningFor(timeSpan, startDate);

        return updateObject(state, {
            selected: updateObject(state.selected, {
                previouslySelectedTimeSpan: timeSpan,
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
    fetchApiGraphDataSuccess: (state: IDataReducerState, action: any) => { // , merge = defaultMerge
        const typesOfData: DataSet[] = action.payload.typesOfData;

        const datasets: any = {};

        typesOfData.forEach((typeOfData, index: number) => {
            const existingData: IApiGraph = state.dataset[typeOfData];
            const newData: IApiGraph = action.payload.data[index].data;

            let data: IApiGraph;
            if (existingData) {
                let mergeOrder: any[];

                const existingDataIds = existingData.weeks.reduce((arr, week) => [...arr, ...week.days.map(day => day.id)], []);
                const newDataIds = newData.weeks.reduce((arr, week) => [...arr, ...week.days.map(day => day.id)], []);
                const duplicateIds = existingDataIds.filter(id => newDataIds.indexOf(id) !== -1);

                // Filter out the duplicate data
                if (duplicateIds.length) {
                    newData.weeks = newData.weeks.filter(week => duplicateIds.indexOf(week.days[0].id) === -1)
                }

                if (newData.weeks.length) {
                    const firstTimestampInNewData = newData.weeks[0].days[0].timestamp;
                    const lastTimestampInExistingData = existingData.weeks[existingData.weeks.length - 1].days[6].timestamp;

                    const newDataMustComeAfterExistingData = firstTimestampInNewData > lastTimestampInExistingData;
                    if (newDataMustComeAfterExistingData) {
                        mergeOrder = [existingData, newData]
                    } else {
                        mergeOrder = [newData, existingData]
                    }
                    data = merge.all(mergeOrder) as IApiGraph;
                } else {
                    data = existingData
                }
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

    fetchApiGroupsDataStart: (state: IDataReducerState) => {
        return updateObject(state, {
            loading: updateObject(state.loading, { groups: true })
        });
    },

    fetchApiGroupsDataSuccess: (state: IDataReducerState, action: any) => {
        return updateObject(state, {
            loading: updateObject(state.loading, { groups: false }),
            groups: action.payload.data.data.groups
        });
    },

    fetchApiAnalyticsDataStart: (state: IDataReducerState) => {
        return updateObject(state, {
            loading: updateObject(state.loading, { analytics: true })
        });
    },

    fetchApiAnalyticsDataSuccess: (state: IDataReducerState, action: any) => {
        return updateObject(state, {
            loading: updateObject(state.loading, { analytics: false }),
            analytics: action.payload.data.data.results
        });
    },

    fetchApiGraphDataFailed: (state: IDataReducerState, action: any) => {
        return updateObject(state, {
            loading: updateObject(state.loading, {
                partial: false,
                items: false,
                groups: false,
                analytics: false
            }),
            error: updateObject(state.error, {
                status: true,
                error: action.payload.error,
                message: 'The data could not be retrieved!'
            })
        });
    },
};
