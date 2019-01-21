import Actions from '../actionTypes';
import defaultAxios from '../../config.axios';
import {TimeSpan} from '../../utils/date/dateTypes';
import {epochTimestamp, getDateRangeOfSixtyDaysAround} from '../../utils/date/date';
import {DataSet, getAllDatasets} from '../../utils/data/apiGraph';
import {IApiGroup} from '../../utils/data/dataTypes';

const DEBUG_ASYNC_ACTIONS = false;

const baseUrl: string = '/api';
const groupsUrl: string = 'groups';
const itemsUrl: string = 'items';
const graphsUrl: string = 'graphs';


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

export const fetchApiGroupsDataStart = () => ({
    type: Actions.FETCH_API_GROUPS_DATA_START
});

export const fetchApiGroupsDataSuccess = (data: any[]) => ({
    type: Actions.FETCH_API_GROUPS_DATA_SUCCESS,
    payload: { data }
});

export const fetchApiDataFailed = (error: any, ignore = false) => {
    return ignore ? { type: Actions.IGNORE } : {
        type: Actions.FETCH_API_DATA_FAILED,
        payload: { error }
    }
};

const reFetchItemsAndGroups = (dispatch: any, axios: any) => {
    if (DEBUG_ASYNC_ACTIONS) console.log('[GET]', `${baseUrl}/${itemsUrl}`);
    dispatch(fetchApiItemsDataStart());
    return axios.get(`${baseUrl}/${itemsUrl}`)
        .then((res: any) => {
            dispatch(fetchApiItemsDataSuccess(res));
            return Promise.resolve()
        })
        .then(() => {
            if (DEBUG_ASYNC_ACTIONS) console.log('[GET]', `${baseUrl}/${groupsUrl}`);
            dispatch(fetchApiGroupsDataStart());
            return axios.get(`${baseUrl}/${groupsUrl}`)
        })
        .then((res: any) => {
            dispatch(fetchApiGroupsDataSuccess(res));
            return Promise.resolve()
        })
};

export const addItemToGroup = (itemId: number, groupId: number, axios: any = defaultAxios) => {
    const url: string = `${baseUrl}/${groupsUrl}/${groupId}/${itemsUrl}`;

    const postObject = {
        item_id: itemId
    };

    return (dispatch: any) => {

        if (DEBUG_ASYNC_ACTIONS) console.log('[POST]', url);

        axios.post(url, postObject)
            .then(() => reFetchItemsAndGroups(dispatch, axios))
            .catch((err: Error) => dispatch(fetchApiDataFailed(err, true)));
    };
};
export const removeItemFromGroup = (itemId: number, groupId: number, axios: any = defaultAxios) => {
    const url: string = `${baseUrl}/${groupsUrl}/${groupId}/${itemsUrl}/${itemId}`;

    return (dispatch: any) => {

        if (DEBUG_ASYNC_ACTIONS) console.log('[DELETE]', url);

        axios.delete(url)
            .then(() => reFetchItemsAndGroups(dispatch, axios))
            .catch((err: Error) => dispatch(fetchApiDataFailed(err, true)));
    };
};
export const removeGroup = (groupId: number, axios: any = defaultAxios) => {
    const url: string = `${baseUrl}/${groupsUrl}/${groupId}`;

    return (dispatch: any) => {

        if (DEBUG_ASYNC_ACTIONS) console.log('[DELETE]', url);

        axios.delete(url)
            .then(() => reFetchItemsAndGroups(dispatch, axios))
            .catch((err: Error) => dispatch(fetchApiDataFailed(err, true)));
    };
};
export const editGroup = (groupId: number, group: IApiGroup, axios: any = defaultAxios) => {
    const url: string = `${baseUrl}/${groupsUrl}/${groupId}`;

    return (dispatch: any) => {

        if (DEBUG_ASYNC_ACTIONS) console.log('[PUT]', url);

        axios.put(url, group)
            .then(() => reFetchItemsAndGroups(dispatch, axios))
            .catch((err: Error) => dispatch(fetchApiDataFailed(err, true)));
    };
};
export const addGroup = (group: IApiGroup, axios: any = defaultAxios) => {
    const url: string = `${baseUrl}/${groupsUrl}`;

    return (dispatch: any) => {

        if (DEBUG_ASYNC_ACTIONS) console.log('[POST]', url);

        axios.post(url, group)
            .then(() => reFetchItemsAndGroups(dispatch, axios))
            .catch((err: Error) => dispatch(fetchApiDataFailed(err, true)));
    };
};

export const fetchApiGraphData = (centerDate: Date, typesOfData?: DataSet[], axios: any = defaultAxios) => {
    const fromDate = getDateRangeOfSixtyDaysAround(centerDate).fromDate;
    const toDate = getDateRangeOfSixtyDaysAround(centerDate).toDate;
    return fetchApiGraphDataDispatcher(epochTimestamp(fromDate), epochTimestamp(toDate), typesOfData, axios)
};
export const fetchApiItemsData = (axios: any = defaultAxios) => {
    return (dispatch: any) => {
        dispatch(fetchApiItemsDataStart());

        if (DEBUG_ASYNC_ACTIONS) console.log('[GET]', `${baseUrl}/${itemsUrl}`);

        axios.get(`${baseUrl}/${itemsUrl}`)
            .then((res: any) => dispatch(fetchApiItemsDataSuccess(res)))
            .catch((err: Error) => dispatch(fetchApiDataFailed(err)));
    };
};
export const fetchApiGroupsData = (axios: any = defaultAxios) => {
    return (dispatch: any) => {
        dispatch(fetchApiGroupsDataStart());

        if (DEBUG_ASYNC_ACTIONS) console.log('[GET]', `${baseUrl}/${groupsUrl}`);

        axios.get(`${baseUrl}/${groupsUrl}`)
            .then((res: any) => dispatch(fetchApiGroupsDataSuccess(res)))
            .catch((err: Error) => dispatch(fetchApiDataFailed(err)));
    };
};

export const fetchDataInRange = (startDate: Date, endDate: Date, typesOfData?: DataSet[], axios: any = defaultAxios) => {
    return fetchApiGraphDataDispatcher(epochTimestamp(startDate), epochTimestamp(endDate), typesOfData, axios)
};

const fetchApiGraphDataDispatcher = (
    startingDateEpochTimestamp: string | number,
    endingDateEpochTimestamp: string | number,
    typesOfData: DataSet[] = getAllDatasets(),
    axios: any = defaultAxios
) => {
    let urls: string[] = typesOfData.map(typeOfData => `${baseUrl}/${graphsUrl}/${typeOfData}`);
    if (startingDateEpochTimestamp && endingDateEpochTimestamp) {
        urls = urls.map(url =>
            url + '?starting_date_timestamp=' + startingDateEpochTimestamp + '&ending_date_timestamp=' + endingDateEpochTimestamp
        );
    }

    if (DEBUG_ASYNC_ACTIONS) urls.forEach(url => console.log('[GET]', url));

    return (dispatch: any) => {
        dispatch(fetchApiGraphDataStart());
        const promises = urls.map(url => axios.get(url));
        Promise.all(promises)
            .then((res: any) => dispatch(fetchApiGraphDataSuccess(typesOfData, res)))
            .catch((err: Error) => dispatch(fetchApiDataFailed(err)));
    };
};
