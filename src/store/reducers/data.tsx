import Actions from '../actionTypes';
import { updateObject } from '../utilities';
import {TimeSpan} from '../../utils/chartDataUtilities';
import {
    cleanMilliSecondsAndSeconds,
    getBeginningOfTheDay,
    getBeginningOfTheMonth,
    getBeginningOfTheWeek
} from '../../utils/dateUtilities';

interface IState {
    selected: {
        timeSpan: TimeSpan,
        graphStartDateTime: Date
        currentDateTime: Date
    }
    temperature: {
        loading: boolean,
        data: any,
        error: boolean
    }
}

const setTimespanForGraphs = (state: any, action: any) => {
    return updateObject(state, {
        ...state,
        selected: {
            ...state.selected,
            timeSpan: action.payload.timeSpan
        }
    });
};
const setStartDateForGraphs = (state: any, action: any) => {
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
};
const setCurrentDate = (state: any) => {
    return updateObject(state, {
        ...state,
        selected: {
            ...state.selected,
            currentDateTime: new Date()
        }
    });
};

const fetchTemperatureStart = (state: any) => {
    return updateObject(state, {
        temperature: updateObject(state.temperature, {
            loading: true,
            error: false
        })
    });
};
const fetchTemperatureSuccess = (state: any, action: any) => {
    return updateObject(state, {
        temperature: updateObject(state.temperature, {
            data: action.payload.data,
            loading: false
        })
    });
};

const fetchTemperatureFailed = (state: any) => {
    return updateObject(state, {
        temperature: updateObject(state.temperature, {
            error: true
        })
    });
};

const initialState = {
    selected: {
        timeSpan: TimeSpan.day,
        graphStartDateTime: getBeginningOfTheDay(new Date()),
        currentDateTime: new Date()
    },
    temperature: {
        loading: true,
        data: null as any,
        error: false
    }
};

const REDUCER = ( state: IState = initialState, action: any ) => {
    switch ( action.type ) {
        case Actions.SET_TIMESPAN_FOR_GRAPHS: return setTimespanForGraphs(state, action);
        case Actions.SET_START_DATE_FOR_GRAPHS: return setStartDateForGraphs(state, action);
        case Actions.SET_CURRENT_DATE: return setCurrentDate(state);
        case Actions.FETCH_TEMPERATURE_START: return fetchTemperatureStart(state);
        case Actions.FETCH_TEMPERATURE_SUCCESS: return fetchTemperatureSuccess(state, action);
        case Actions.FETCH_TEMPERATURE_FAILED: return fetchTemperatureFailed(state);
        default: return state;
    }
};

export default REDUCER;
