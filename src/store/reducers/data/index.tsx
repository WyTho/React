import Actions from '../../actionTypes';
import {TimeSpan} from '../../../utils/date/dateTypes';
import {getBeginningOfTheDay, getBeginningOfTheHour} from '../../../utils/date/date';
import functions from './functions';
import {DataSet, getAllDatasets} from '../../../utils/data/apiGraph';
import {IApiGraph, IApiItem} from '../../../utils/data/dataTypes';

export interface IDataReducerState {
    selected: {
        previouslySelectedTimeSpan?: TimeSpan
        timeSpan: TimeSpan
        graphStartDateTime: Date
        currentHourDateTime: Date
    },
    items: IApiItem[]
    loading: {
        initial: boolean
        partial: boolean
        items: boolean
    },
    error: {
        status: boolean
        error: Error
        message: string
    },
    dataset: {
        [index in DataSet]: IApiGraph
    }
}

const initialState: IDataReducerState = {
    selected: {
        timeSpan: TimeSpan.day,
        graphStartDateTime: getBeginningOfTheDay(new Date()),
        currentHourDateTime: getBeginningOfTheHour(new Date())
    },
    items: null as IApiItem[],
    loading: {
        initial: true,
        partial: false,
        items: false
    },
    error: {
        status: false,
        error: null as Error,
        message: null as string
    },
    dataset: getAllDatasets().reduce((o: any, dataset: DataSet) => {
        o[dataset] = null as IApiGraph;
        return o
    }, {})
};

const REDUCER = ( state: IDataReducerState = initialState, action: any ) => {
    switch ( action.type ) {
        case Actions.SET_TIMESPAN_FOR_GRAPHS:      return functions.setTimespanForGraphs(state, action);
        case Actions.SET_START_DATE_FOR_GRAPHS:    return functions.setStartDateForGraphs(state, action);
        case Actions.SET_CURRENT_DATE:             return functions.setCurrentDate(state);

        case Actions.FETCH_API_GRAPH_DATA_START:   return functions.fetchApiGraphDataStart(state);
        case Actions.FETCH_API_GRAPH_DATA_SUCCESS: return functions.fetchApiGraphDataSuccess(state, action);

        case Actions.FETCH_API_ITEMS_DATA_START:   return functions.fetchApiItemsDataStart(state);
        case Actions.FETCH_API_ITEMS_DATA_SUCCESS: return functions.fetchApiItemsDataSuccess(state, action);

        case Actions.FETCH_API_DATA_FAILED:        return functions.fetchApiGraphDataFailed(state, action);

        default: return state;
    }
};

export default REDUCER;
