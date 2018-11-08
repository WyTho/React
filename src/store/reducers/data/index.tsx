import Actions from '../../actionTypes';
import {TimeSpan} from '../../../utils/date/dateTypes';
import {getBeginningOfTheDay, getBeginningOfTheHour} from '../../../utils/date/date';
import functions from './functions';
import {DataSet, getAllDatasets} from '../../../utils/data/data';
import {IData} from '../../../utils/chart/chartTypes';

export interface IDataReducerState {
    selected: {
        timeSpan: TimeSpan
        graphStartDateTime: Date
        currentHourDateTime: Date
    },
    loading: {
        initial: boolean
        partial: boolean
    },
    error: {
        status: boolean
        error: Error
        message: string
    },
    dataset: {
        [index in DataSet]: IData
    }
}

console.log('here');
const initialState: IDataReducerState = {
    selected: {
        timeSpan: TimeSpan.day,
        graphStartDateTime: getBeginningOfTheDay(new Date()),
        currentHourDateTime: getBeginningOfTheHour(new Date())
    },
    loading: {
        initial: false,
        partial: false
    },
    error: {
        status: false,
        error: null as Error,
        message: null as string
    },
    dataset: getAllDatasets().reduce((o: any, dataset: DataSet) => {
        o[dataset] = null as IData;
        return o
    }, {})
};

const REDUCER = ( state: IDataReducerState = initialState, action: any ) => {
    switch ( action.type ) {
        case Actions.SET_TIMESPAN_FOR_GRAPHS:   return functions.setTimespanForGraphs(state, action);
        case Actions.SET_START_DATE_FOR_GRAPHS: return functions.setStartDateForGraphs(state, action);
        case Actions.SET_CURRENT_DATE:          return functions.setCurrentDate(state);
        case Actions.FETCH_DATA_START:          return functions.fetchDataStart(state, action);
        case Actions.FETCH_DATA_SUCCESS:        return functions.fetchDataSuccess(state, action);
        case Actions.FETCH_DATA_FAILED:         return functions.fetchDataFailed(state, action);
        default: return state;
    }
};

export default REDUCER;
