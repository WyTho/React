import {TimeSpan} from '../../../utils/date/dateTypes';
import {cleanMilliSecondsAndSeconds, getBeginningOfTheDay, getBeginningOfTheMonth, getBeginningOfTheWeek} from '../../../utils/date/date';
import {updateObject} from '../../utilities';
import {IDataReducerState} from './index';
import {DataSet} from '../../../utils/data/data';
import merge from 'deepmerge'

export default {
    setTimespanForGraphs: (state: IDataReducerState, action: any) => {
        return updateObject(state, {
            ...state,
            selected: {
                ...state.selected,
                timeSpan: action.payload.timeSpan
            }
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
            ...state,
            selected: {
                ...state.selected,
                graphStartDateTime: startDate
            }
        });
    },
    setCurrentDate: (state: IDataReducerState) => {
        return updateObject(state, {
            ...state,
            selected: {
                ...state.selected,
                currentDateTime: new Date()
            }
        });
    },
    fetchDataStart: (state: IDataReducerState, action: any) => {
        const typeOfData: DataSet = action.payload.typeOfData;
        return updateObject(state, {
            [typeOfData]: updateObject(state[typeOfData], {
                loading: true,
                error: false
            })
        });
    },
    fetchDataSuccess: (state: IDataReducerState, action: any) => {
        const typeOfData: DataSet = action.payload.typeOfData;

        const existingData = state[typeOfData].data;
        const newData = action.payload.data.data;

        // if (existingData) console.log('existingData', existingData);
        // if (existingData) existingData.weeks.forEach((week: any) => {
        //     const ids: any[] = [];
        //     week.days.forEach((day: any) => ids.push('[' + day.id + '] ' + day.timestamp));
        //     console.log(ids)
        // });

        // if (newData) console.log('newData', newData);
        // if (newData) newData.weeks.forEach((week: any) => {
        //     const ids: any[] = [];
        //     week.days.forEach((day: any) => ids.push('[' + day.id + '] ' + day.timestamp));
        //     console.log(ids)
        // });

        let data;
        if (existingData) {
            let mergeOrder: any[];
            if (newData.weeks[0].days[0].timestamp > existingData.weeks[existingData.weeks.length - 1].days[6].timestamp) {
                console.log('new data must come after existing data');
                mergeOrder = [existingData, newData]
            } else {
                console.log('existing data must come after new data');
                mergeOrder = [newData, existingData]
            }
            data = merge.all(mergeOrder);
        } else {
            data = newData
        }

        console.log(data);

        return updateObject(state, {
            [typeOfData]: updateObject(state[typeOfData], {
                data,
                loading: false
            })
        });

    },
    fetchDataFailed: (state: IDataReducerState, action: any) => {
        const typeOfData: DataSet = action.payload.typeOfData;
        return updateObject(state, {
            [typeOfData]: updateObject(state[typeOfData], {
                error: true
            })
        });
    }
};
