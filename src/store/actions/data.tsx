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

export const fetchDataStart = (initialLoad: boolean) => ({
    type: Actions.FETCH_DATA_START,
    payload: { initialLoad }
});

export const fetchDataSuccess = (typesOfData: DataSet[], data: any[]) => ({
    type: Actions.FETCH_DATA_SUCCESS,
    payload: { typesOfData, data }
});

export const fetchDataFailed = (error: any) => ({
    type: Actions.FETCH_DATA_FAILED,
    payload: { error }
});

export const fetchData = (typesOfData: DataSet[], centerDate: Date, initialLoad: boolean) => {
    const fromDate = getDateRangeOfTwoMonthsAround(centerDate).fromDate;
    const toDate = getDateRangeOfTwoMonthsAround(centerDate).toDate;
    return fetchDataDispatcher(typesOfData, epochTimestamp(fromDate), epochTimestamp(toDate), initialLoad)
};

export const fetchDataInRange = (typesOfData: DataSet[], startDate: Date, endDate: Date) => {
    return fetchDataDispatcher(typesOfData, epochTimestamp(startDate), epochTimestamp(endDate), false)
};

const fetchDataDispatcher = (
    typesOfData: DataSet[],
    startingDateEpochTimestamp: string | number,
    endingDateEpochTimestamp: string | number,
    initialLoad: boolean,
) => {
    let urls: string[] = typesOfData.map(typeOfData => '/api/graph/' + typeOfData);
    if (startingDateEpochTimestamp && endingDateEpochTimestamp) {
        urls = urls.map(url =>
            url + '?starting_date_timestamp=' + startingDateEpochTimestamp + '&ending_date_timestamp=' + endingDateEpochTimestamp
        );
    }

    console.log(urls);

    return (dispatch: any) => {
        dispatch(fetchDataStart(initialLoad));

        const promises = urls.map(url => axios.get(url));

        Promise.all(promises)
            .then((res: any) => dispatch(fetchDataSuccess(typesOfData, res)))
            .catch((err: Error) => dispatch(fetchDataFailed(err)));

    };
};
