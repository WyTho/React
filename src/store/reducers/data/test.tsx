import reducer from './index';
import functions from './functions';
import {DataSet, getAllDatasets} from '../../../utils/data/apiGraph';
import {TimeSpan} from '../../../utils/date/dateTypes';
import {IApiGraph, IApiItem, IApiItemGroup, IApiItemUsage} from '../../../utils/data/dataTypes';
import {getBeginningOfTheDay, getBeginningOfTheHour, getBeginningOfTheMonth, getBeginningOfTheWeek} from '../../../utils/date/date';
import Actions from '../../actionTypes';
import * as dateUtils from '../../../utils/date/date';
import * as merge from 'deepmerge';

describe('functions.tsx (data reducer)', () => {
    const initialState = {
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

    describe('SET_TIMESPAN_FOR_GRAPHS', () => {
        it('should set the timeSpan to week correctly', () => {
            const newTimeSpan = TimeSpan.week;
            const action = {
                type: Actions.SET_TIMESPAN_FOR_GRAPHS,
                payload: {
                    timeSpan: newTimeSpan
                }
            };
            const expectedState = {
                ...initialState,
                selected: {
                    ...initialState.selected,
                    timeSpan: newTimeSpan
                }
            };
            expect(reducer(initialState, action)).toEqual(expectedState)
        });
        it('should set the timeSpan to month correctly', () => {
            const newTimeSpan = TimeSpan.month;
            const action = {
                type: Actions.SET_TIMESPAN_FOR_GRAPHS,
                payload: {
                    timeSpan: newTimeSpan
                }
            };
            const expectedState = {
                ...initialState,
                selected: {
                    ...initialState.selected,
                    timeSpan: newTimeSpan
                }
            };
            expect(reducer(initialState, action)).toEqual(expectedState)
        })
    });

    describe('SET_START_DATE_FOR_GRAPHS', () => {
        it('should set the setStartDate For Graphs correctly when timeSpan is day', () => {
            // Woensdag 21/11/2018 @ 12:43:37 (HH:MM:SS)
            const wednesday = new Date(1542800617045);
            const timeSpan = TimeSpan.day;

            const action = {
                type: Actions.SET_START_DATE_FOR_GRAPHS,
                payload: {
                    startDate: wednesday
                }
            };
            const expectedState = {
                ...initialState,
                selected: {
                    ...initialState.selected,
                    timeSpan,
                    graphStartDateTime: getBeginningOfTheDay(wednesday)
                }
            };
            expect(reducer(initialState, action)).toEqual(expectedState)
        });
        it('should set the setStartDate For Graphs correctly when timeSpan is week', () => {
            // Woensdag 21/11/2018 @ 12:43:37 (HH:MM:SS)
            const wednesday = new Date(1542800617045);
            const timeSpan = TimeSpan.week;

            const action = {
                type: Actions.SET_START_DATE_FOR_GRAPHS,
                payload: {
                    startDate: wednesday
                }
            };
            const state = {
                ...initialState,
                selected: {
                    ...initialState.selected,
                    timeSpan,
                }
            };
            const expectedState = {
                ...initialState,
                selected: {
                    ...initialState.selected,
                    timeSpan,
                    graphStartDateTime: getBeginningOfTheWeek(wednesday)
                }
            };
            expect(reducer(state, action)).toEqual(expectedState)
        });
        it('should set the setStartDate For Graphs correctly when timeSpan is month', () => {
            // Woensdag 21/11/2018 @ 12:43:37 (HH:MM:SS)
            const wednesday = new Date(1542800617045);
            const timeSpan = TimeSpan.month;

            const action = {
                type: Actions.SET_START_DATE_FOR_GRAPHS,
                payload: {
                    startDate: wednesday
                }
            };
            const state = {
                ...initialState,
                selected: {
                    ...initialState.selected,
                    timeSpan,
                }
            };
            const expectedState = {
                ...initialState,
                selected: {
                    ...initialState.selected,
                    timeSpan,
                    graphStartDateTime: getBeginningOfTheMonth(wednesday)
                }
            };
            expect(reducer(state, action)).toEqual(expectedState)
        });
    });

    describe('SET_CURRENT_DATE', () => {
        const action = {
            type: Actions.SET_CURRENT_DATE
        };

        it('should set current date', () => {
            expect(Math.floor(reducer(initialState, action).selected.currentHourDateTime.getTime() / 100000000))
                .toEqual(Math.floor((new Date()).getTime() / 100000000));
            expect(reducer(initialState, action).selected.currentHourDateTime.getDate()).toBeGreaterThanOrEqual((new Date()).getDate() - 1);
            expect(reducer(initialState, action).selected.currentHourDateTime.getDate()).toBeLessThanOrEqual((new Date()).getDate() + 1);
        })
    });

    describe('FETCH_API_GRAPH_DATA_START', () => {
        const action = {
            type: Actions.FETCH_API_GRAPH_DATA_START
        };

        it('should set partial loading to true, and error to false', () => {
            const expectedState = {
                ...initialState,
                loading: {
                    ...initialState.loading,
                    partial: true
                },
                error: {
                    ...initialState.error,
                    status: false,
                    message: null as string
                },
            };
            expect(reducer(initialState, action)).toEqual(expectedState)
        })
    });

    describe('FETCH_API_GRAPH_DATA_SUCCESS', () => {
        const mockApiGraphData = (timeSpan: TimeSpan, d: Date): IApiGraph => {
            let amountOfDummyWeeks = 1;

            if (timeSpan === TimeSpan.day) {
                d = dateUtils.getBeginningOfTheDay(d);
            } else if (timeSpan === TimeSpan.week) {
                d = dateUtils.getBeginningOfTheWeek(d);
            } else {
                d = dateUtils.getBeginningOfTheMonth(d);
                amountOfDummyWeeks = 5;
            }
            const data: IApiGraph = {
                id: 0,
                data_type: '',
                title: '',
                weeks: []
            };

            const randomValues = (): number[] => Array.from({length: 24}, () => Math.floor(Math.random() * 500) / 10);
            const startTimestamp = d.getTime();
            const oneHour = 3600000;
            const oneDay = oneHour * 24;

            for (let i = 0; i < (amountOfDummyWeeks * 7); i += 7) {
                data.weeks.push({
                    days: [
                        { id: (startTimestamp + (i * oneDay)) / 1000,
                            timestamp: (startTimestamp + (i * oneDay)) / 1000,       values: randomValues() },
                        { id: (startTimestamp + ((i + 1) * oneDay)) / 1000,
                            timestamp: (startTimestamp + ((i + 1) * oneDay)) / 1000, values: randomValues() },
                        { id: (startTimestamp + ((i + 2) * oneDay)) / 1000,
                            timestamp: (startTimestamp + ((i + 2) * oneDay)) / 1000, values: randomValues() },
                        { id: (startTimestamp + ((i + 3) * oneDay)) / 1000,
                            timestamp: (startTimestamp + ((i + 3) * oneDay)) / 1000, values: randomValues() },
                        { id: (startTimestamp + ((i + 4) * oneDay)) / 1000,
                            timestamp: (startTimestamp + ((i + 4) * oneDay)) / 1000, values: randomValues() },
                        { id: (startTimestamp + ((i + 5) * oneDay)) / 1000,
                            timestamp: (startTimestamp + ((i + 5) * oneDay)) / 1000, values: randomValues() },
                        { id: (startTimestamp + ((i + 6) * oneDay)) / 1000,
                            timestamp: (startTimestamp + ((i + 6) * oneDay)) / 1000, values: randomValues() }
                    ]
                })
            }

            return data
        };

        it('should set the retrieved data if there is no data yet', () => {
            const mockData = mockApiGraphData(TimeSpan.month, new Date()) as IApiGraph;
            const action = {
                type: Actions.FETCH_API_GRAPH_DATA_SUCCESS,
                payload: {
                    typesOfData: [
                        DataSet.AVERAGE_TEMPERATURE,
                        DataSet.AVERAGE_WATER_USAGE
                    ] as DataSet[],
                    data: [
                        { data: mockData },
                        { data: mockData }
                    ]
                }
            };
            const expectedState = {
                ...initialState,
                loading: {
                    ...initialState.loading,
                    initial: false
                },
                dataset: {
                    [DataSet.AVERAGE_TEMPERATURE]: mockData,
                    [DataSet.AVERAGE_WATER_USAGE]: mockData
                }
            };
            expect(reducer(initialState, action)).toEqual(expectedState)
        });
        it('should add the retrieved data at the end of the existing data if the next week is fetched', () => {
            const today = getBeginningOfTheDay(new Date());
            const nextWeek = new Date(today.getTime());
            nextWeek.setDate(today.getDate() + 7);

            const mockData = mockApiGraphData(TimeSpan.week, today) as IApiGraph;
            const mockDataNextWeek = mockApiGraphData(TimeSpan.week, nextWeek) as IApiGraph;

            const action = {
                type: Actions.FETCH_API_GRAPH_DATA_SUCCESS,
                payload: {
                    typesOfData: [
                        DataSet.AVERAGE_TEMPERATURE,
                        DataSet.AVERAGE_WATER_USAGE
                    ] as DataSet[],
                    data: [
                        { data: mockDataNextWeek },
                        { data: mockDataNextWeek }
                    ]
                }
            };
            const state = {
                ...initialState,
                loading: {
                    ...initialState.loading,
                    initial: false
                },
                dataset: {
                    [DataSet.AVERAGE_TEMPERATURE]: mockData,
                    [DataSet.AVERAGE_WATER_USAGE]: mockData
                }
            };

            const expectedState = {
                ...state,
                dataset: {
                    [DataSet.AVERAGE_TEMPERATURE]: merge.all([mockData, mockDataNextWeek]),
                    [DataSet.AVERAGE_WATER_USAGE]: merge.all([mockData, mockDataNextWeek])
                }
            };
            expect(reducer(state, action)).toEqual(expectedState);
        });
        it('should add the retrieved data at the beginning of the existing data if the previous week is fetched', () => {
            const today = getBeginningOfTheDay(new Date());
            const prevWeek = new Date(today.getTime());
            prevWeek.setDate(today.getDate() - 7);

            const mockData = mockApiGraphData(TimeSpan.week, today) as IApiGraph;
            const mockDataPrevWeek = mockApiGraphData(TimeSpan.week, prevWeek) as IApiGraph;

            const action = {
                type: Actions.FETCH_API_GRAPH_DATA_SUCCESS,
                payload: {
                    typesOfData: [
                        DataSet.AVERAGE_TEMPERATURE,
                        DataSet.AVERAGE_WATER_USAGE
                    ] as DataSet[],
                    data: [
                        { data: mockDataPrevWeek },
                        { data: mockDataPrevWeek }
                    ]
                }
            };
            const state = {
                ...initialState,
                loading: {
                    ...initialState.loading,
                    initial: false
                },
                dataset: {
                    [DataSet.AVERAGE_TEMPERATURE]: mockData,
                    [DataSet.AVERAGE_WATER_USAGE]: mockData
                }
            };

            const expectedState = {
                ...state,
                dataset: {
                    [DataSet.AVERAGE_TEMPERATURE]: merge.all([mockDataPrevWeek, mockData]),
                    [DataSet.AVERAGE_WATER_USAGE]: merge.all([mockDataPrevWeek, mockData])
                }
            };
            expect(reducer(state, action)).toEqual(expectedState);
        });
        it('should remove duplicates if datasets overlap', () => {
            const today = getBeginningOfTheDay(new Date());
            const nextMonth = new Date(today.getTime());
            nextMonth.setMonth(today.getMonth() + 1);

            const mockData = mockApiGraphData(TimeSpan.month, today) as IApiGraph;
            const mockDataNextMonth = mockApiGraphData(TimeSpan.month, nextMonth) as IApiGraph;

            /* the duplicate id filter*/
            const mockDataIds = mockData.weeks.reduce((arr, week) => [...arr, ...week.days.map(day => day.id)], []);
            const mockDataNextMonthIds = mockDataNextMonth.weeks.reduce((arr, week) => [...arr, ...week.days.map(day => day.id)], []);
            const duplicateIds = mockDataIds.filter(id => mockDataNextMonthIds.indexOf(id) !== -1);
            if (duplicateIds.length) {
                mockDataNextMonth.weeks = mockDataNextMonth.weeks.filter(week => duplicateIds.indexOf(week.days[0].id) === -1)
            }
            /* / */

            const action = {
                type: Actions.FETCH_API_GRAPH_DATA_SUCCESS,
                payload: {
                    typesOfData: [
                        DataSet.AVERAGE_TEMPERATURE,
                        DataSet.AVERAGE_WATER_USAGE
                    ] as DataSet[],
                    data: [
                        { data: mockDataNextMonth },
                        { data: mockDataNextMonth }
                    ]
                }
            };
            const state = {
                ...initialState,
                loading: {
                    ...initialState.loading,
                    initial: false
                },
                dataset: {
                    [DataSet.AVERAGE_TEMPERATURE]: mockData,
                    [DataSet.AVERAGE_WATER_USAGE]: mockData
                }
            };

            const expectedState = {
                ...state,
                dataset: {
                    [DataSet.AVERAGE_TEMPERATURE]: merge.all([mockData, mockDataNextMonth]),
                    [DataSet.AVERAGE_WATER_USAGE]: merge.all([mockData, mockDataNextMonth])
                }
            };
            expect(reducer(state, action)).toEqual(expectedState);
        });
        it('should not add the new data if it already exists', () => {
            const today = getBeginningOfTheDay(new Date());

            const mockData = mockApiGraphData(TimeSpan.month, today) as IApiGraph;

            const action = {
                type: Actions.FETCH_API_GRAPH_DATA_SUCCESS,
                payload: {
                    typesOfData: [
                        DataSet.AVERAGE_TEMPERATURE,
                        DataSet.AVERAGE_WATER_USAGE
                    ] as DataSet[],
                    data: [
                        { data: mockData },
                        { data: mockData }
                    ]
                }
            };
            const state = {
                ...initialState,
                loading: {
                    ...initialState.loading,
                    initial: false
                },
                dataset: {
                    [DataSet.AVERAGE_TEMPERATURE]: mockData,
                    [DataSet.AVERAGE_WATER_USAGE]: mockData
                }
            };

            expect(reducer(state, action)).toEqual(state);
        });

    });

    describe('FETCH_API_ITEMS_DATA_START', () => {
        const action = {
            type: Actions.FETCH_API_ITEMS_DATA_START
        };

        it('should set items loading to true', () => {
            const expectedState = {
                ...initialState,
                loading: {
                    ...initialState.loading,
                    items: true
                }
            };
            expect(reducer(initialState, action)).toEqual(expectedState)
        })
    });

    describe('FETCH_API_ITEMS_DATA_SUCCESS', () => {
        it('should set item-loading to false and set the items if the fetch was successful', () => {
            const action = {
                type: Actions.FETCH_API_ITEMS_DATA_SUCCESS,
                payload: {
                    data: {
                        data: {
                            items: [] as IApiItem[]
                        }
                    }
                }
            };
            const expectedState = {
                ...initialState,
                loading: {
                    ...initialState.loading,
                    items: false
                },
                items: [] as IApiItem[]
            };
            expect(reducer(initialState, action)).toEqual(expectedState);

            const dummyItem: IApiItem = {
                id: 0,
                name: '',
                comment: '',
                last_use: {
                    last_use_timestamp: 0,
                    datatype: '',
                    data: {}
                },
                usages: [] as IApiItemUsage[],
                groups: [] as IApiItemGroup[]
            };

            const action2 = {
                ...action,
                payload: {
                    data: {
                        data: {
                            items: [
                                dummyItem,
                                dummyItem,
                                dummyItem,
                                dummyItem
                            ] as IApiItem[]
                        }
                    }
                }
            };
            const expectedState2 = {
                ...expectedState,
                items: [
                    dummyItem,
                    dummyItem,
                    dummyItem,
                    dummyItem
                ] as IApiItem[]
            };
            expect(reducer(initialState, action2)).toEqual(expectedState2)
        });

    });

    describe('FETCH_API_DATA_FAILED', () => {
        it('should set error to true and set the errorMessage', () => {

            const error = new Error('Test');
            const action = {
                type: Actions.FETCH_API_DATA_FAILED,
                payload: { error }
            };

            const expectedState = {
                ...initialState,
                loading: {
                    ...initialState.loading,
                    partial: false,
                    items: false
                },
                error: {
                    status: true,
                    error,
                    message: 'The data could not be retrieved!'
                }
            };
            expect(reducer(initialState, action)).toEqual(expectedState)
        })
    });
});
