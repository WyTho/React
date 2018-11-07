import Actions from '../../actionTypes';
import {TimeSpan} from '../../../utils/date/dateTypes';
import {getBeginningOfTheDay, getBeginningOfTheHour} from '../../../utils/date/date';
import functions from './functions';

export interface IDataReducerState {
    selected: {
        timeSpan: TimeSpan,
        graphStartDateTime: Date,
        currentHourDateTime: Date
    },

    // TODO: restructure
    // loading: {
    //     initial: boolean,
    //     partial: boolean
    // },
    // error: boolean,
    // data: {
    //     AVERAGE_TEMPERATURE: any
    // }

    AVERAGE_TEMPERATURE: {
        loading: boolean,
        data: any,
        error: boolean
    }
}

const initialState: IDataReducerState = {
    selected: {
        timeSpan: TimeSpan.day,
        graphStartDateTime: getBeginningOfTheDay(new Date()),
        currentHourDateTime: getBeginningOfTheHour(new Date())
    },

    // TODO: restructure
    // loading: {
    //     initial: false,
    //     partial: false
    // },
    // error: false,
    // data: {
    //     AVERAGE_TEMPERATURE: null as any
    // }

    AVERAGE_TEMPERATURE: {
        loading: true,
        data: null as any,
        error: false
    }
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
