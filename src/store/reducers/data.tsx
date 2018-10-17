import Actions from '../actionTypes';
import { updateObject } from '../utilities';

interface IState {
    selectedTimespan: string,
    temperature: {
        loading: boolean,
        data: any,
        error: boolean
    }
}

const setTimespanForGraphs = (state: any, action: any) => {
    return updateObject(state, { selectedTimespan: action.payload.selectedTimespan});
};

const fetchTemperatureStart = (state: any) => {
    return updateObject(state, {
        temperature: updateObject(state.temperature, {
            loading: true
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
    selectedTimespan: 'day',
    temperature: {
        loading: false,
        data: null as any,
        error: false
    }
};

const REDUCER = ( state: IState = initialState, action: any ) => {
    switch ( action.type ) {
        case Actions.SET_TIMESPAN_FOR_GRAPHS: return setTimespanForGraphs(state, action);
        case Actions.FETCH_TEMPERATURE_START: return fetchTemperatureStart(state);
        case Actions.FETCH_TEMPERATURE_SUCCESS: return fetchTemperatureSuccess(state, action);
        case Actions.FETCH_TEMPERATURE_FAILED: return fetchTemperatureFailed(state);
        default: return state;
    }
};

export default REDUCER;
