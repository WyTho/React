import Actions from '../actionTypes';
import axios from '../../config.axios';
import {TimeSpan} from '../../utils/date/dateTypes';

export const setTimeSpanForGraphs = (timeSpan: TimeSpan) => ({
    type: Actions.SET_TIMESPAN_FOR_GRAPHS,
    payload: { timeSpan }
});

export const setStartDateForGraphs = (startDate: Date) => ({
    type: Actions.SET_START_DATE_FOR_GRAPHS,
    payload: { startDate }
});
export const setCurrentDate = (currentDate: Date) => ({
    type: Actions.SET_CURRENT_DATE,
    payload: { currentDate }
});

export const fetchTemperatureStart = () => ({
    type: Actions.FETCH_TEMPERATURE_START
});

export const fetchTemperatureSuccess = (data: any) => ({
    type: Actions.FETCH_TEMPERATURE_SUCCESS,
    payload: { data }
});

export const fetchTemperatureFailed = (error: any) => ({
    type: Actions.FETCH_TEMPERATURE_FAILED,
    payload: { error }
});

export const fetchTemperature = () => {
    console.log('[store/actions/data.tsx] ___ fetchTemperature()');
    return (dispatch: any) => {
        dispatch(fetchTemperatureStart());
        axios.get('/api/graph/AVERAGE_TEMPERATURE')
            .then((res: any) => {
                dispatch(fetchTemperatureSuccess(res));
            })
            .catch((err: any) => {
                dispatch(fetchTemperatureFailed(err));
            });
    };
};
