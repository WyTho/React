import Actions from '../actionTypes';
import axios from '../../config.axios';
import {TimeSpan} from '../../utils/date/dateTypes';
import {epochTimestamp, getDateRangeOfTwoMonthsAround} from '../../utils/date/date';
import {DataSet} from '../../utils/data/data';

export const setTimeSpanForGraphs = (timeSpan: TimeSpan) => ({
    type: Actions.SET_TIMESPAN_FOR_GRAPHS,
    payload: { timeSpan }
});

export const setStartDateForGraphs = (startDate: Date) => ({
    type: Actions.SET_START_DATE_FOR_GRAPHS,
    payload: { startDate }
});
export const setCurrentDate = () => ({
    type: Actions.SET_CURRENT_DATE
});

export const fetchDataStart = (typeOfData: DataSet) => ({
    type: Actions.FETCH_DATA_START,
    payload: { typeOfData }
});

export const fetchDataSuccess = (typeOfData: DataSet, data: any) => ({
    type: Actions.FETCH_DATA_SUCCESS,
    payload: { typeOfData, data }
});

export const fetchDataFailed = (typeOfData: DataSet, error: any) => ({
    type: Actions.FETCH_DATA_FAILED,
    payload: { typeOfData, error }
});

// TODO: handle multiple DataSet[]
export const fetchData = (typeOfData: DataSet, centerDate?: Date) => {
    if (centerDate) {
        const fromDate = getDateRangeOfTwoMonthsAround(centerDate).fromDate;
        const toDate = getDateRangeOfTwoMonthsAround(centerDate).toDate;
        return fetchDataDispatcher(typeOfData, epochTimestamp(fromDate), epochTimestamp(toDate))
    } else {
        return fetchDataDispatcher(typeOfData)
    }
};

// TODO: handle multiple DataSet[]
export const fetchDataInRange = (typeOfData: DataSet, startDate?: Date, endDate?: Date) => {
    return fetchDataDispatcher(typeOfData, epochTimestamp(startDate), epochTimestamp(endDate))
};

const fetchDataDispatcher = (
    typeOfData: DataSet,
    startingDateEpochTimestamp?: string | number,
    endingDateEpochTimestamp?: string | number
) => {
    let url = '/api/graph/' + typeOfData;
    if (startingDateEpochTimestamp && endingDateEpochTimestamp) {
        url += '?starting_date_timestamp=' + startingDateEpochTimestamp + '&ending_date_timestamp=' + endingDateEpochTimestamp;
    }

    console.log(url);

    return (dispatch: any) => {
        console.log('dispatching fetchDataStart!');
        dispatch(fetchDataStart(typeOfData));
        axios.get(url)
            .then((res: any) => dispatch(fetchDataSuccess(typeOfData, res)))
            .catch((err: any) => dispatch(fetchDataFailed(typeOfData, err)));
    };
};
