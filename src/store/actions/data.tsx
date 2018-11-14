import Actions from '../actionTypes';
import axios from '../../config.axios';
import {TimeSpan} from '../../utils/date/dateTypes';
import {epochTimestamp, getDateRangeOfTwoMonthsAround} from '../../utils/date/date';
import {DataSet, getAllDatasets} from '../../utils/data/apiGraph';

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

export const fetchApiGraphDataStart = () => ({
    type: Actions.FETCH_API_GRAPH_DATA_START
});

export const fetchApiGraphDataSuccess = (typesOfData: DataSet[], data: any[]) => ({
    type: Actions.FETCH_API_GRAPH_DATA_SUCCESS,
    payload: { typesOfData, data }
});

export const fetchApiItemsDataStart = () => ({
    type: Actions.FETCH_API_ITEMS_DATA_START
});

export const fetchApiItemsDataSuccess = (data: any[]) => ({
    type: Actions.FETCH_API_ITEMS_DATA_SUCCESS,
    payload: { data }
});

export const fetchApiDataFailed = (error: any) => ({
    type: Actions.FETCH_API_DATA_FAILED,
    payload: { error }
});

export const fetchApiGraphData = (centerDate: Date, typesOfData?: DataSet[]) => {
    const fromDate = getDateRangeOfTwoMonthsAround(centerDate).fromDate;
    const toDate = getDateRangeOfTwoMonthsAround(centerDate).toDate;
    return fetchApiGraphDataDispatcher(epochTimestamp(fromDate), epochTimestamp(toDate), typesOfData)
};
export const fetchApiItemsData = () => {
    const url: string = '/api/item';
    return (dispatch: any) => {
        dispatch(fetchApiItemsDataStart());

        // TODO: REMOVE
        console.log('[GET]', url);

        axios.get(url)
            .then((res: any) => dispatch(fetchApiItemsDataSuccess(res)))
            .catch((err: Error) => dispatch(fetchApiDataFailed(err)));
    };
};

export const fetchDataInRange = (startDate: Date, endDate: Date, typesOfData?: DataSet[]) => {
    return fetchApiGraphDataDispatcher(epochTimestamp(startDate), epochTimestamp(endDate), typesOfData)
};

const fetchApiGraphDataDispatcher = (
    startingDateEpochTimestamp: string | number,
    endingDateEpochTimestamp: string | number,
    typesOfData: DataSet[] = getAllDatasets(),
) => {
    let urls: string[] = typesOfData.map(typeOfData => '/api/graph/' + typeOfData);
    if (startingDateEpochTimestamp && endingDateEpochTimestamp) {
        urls = urls.map(url =>
            url + '?starting_date_timestamp=' + startingDateEpochTimestamp + '&ending_date_timestamp=' + endingDateEpochTimestamp
        );
    }

    // TODO: REMOVE
    urls.forEach(url => console.log('[GET]', url));

    return (dispatch: any) => {
        dispatch(fetchApiGraphDataStart());
        const promises = urls.map(url => axios.get(url));
        Promise.all(promises)
            .then((res: any) => dispatch(fetchApiGraphDataSuccess(typesOfData, res)))
            .catch((err: Error) => dispatch(fetchApiDataFailed(err)));
    };
};
