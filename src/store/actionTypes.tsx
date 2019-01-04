enum Actions {

    // theme
    THEME_TOGGLE = 'THEME_TOGGLE',

    SET_CURRENT_DATE = 'SET_CURRENT_DATE',

    // Popup
    PUSH_POPUP = 'PUSH_POPUP',
    POP_POPUP = 'POP_POPUP',

    // data (filters)
    SET_TIMESPAN_FOR_GRAPHS = 'SET_TIMESPAN_FOR_GRAPHS',
    SET_START_DATE_FOR_GRAPHS = 'SET_START_DATE_FOR_GRAPHS',

    // graph data (async)
    FETCH_API_GRAPH_DATA_START   = 'FETCH_API_GRAPH_DATA_START',
    FETCH_API_GRAPH_DATA_SUCCESS = 'FETCH_API_GRAPH_DATA_SUCCESS',

    // item data (async)
    FETCH_API_ITEMS_DATA_START   = 'FETCH_API_ITEMS_DATA_START',
    FETCH_API_ITEMS_DATA_SUCCESS = 'FETCH_API_ITEMS_DATA_SUCCESS',

    // group data (async)
    FETCH_API_GROUPS_DATA_START   = 'FETCH_API_GROUPS_DATA_START',
    FETCH_API_GROUPS_DATA_SUCCESS = 'FETCH_API_GROUPS_DATA_SUCCESS',

    FETCH_API_DATA_FAILED  = 'FETCH_API_DATA_FAILED'
}

export default Actions;
