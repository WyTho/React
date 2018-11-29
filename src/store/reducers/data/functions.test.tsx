import functions from './functions';
import {DataSet, getAllDatasets} from '../../../utils/data/apiGraph';
import {TimeSpan} from '../../../utils/date/dateTypes';
import {IApiGraph, IApiItem} from '../../../utils/data/dataTypes';
import {getBeginningOfTheDay, getBeginningOfTheHour, getBeginningOfTheMonth, getBeginningOfTheWeek} from '../../../utils/date/date';
import Actions from '../../actionTypes';

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

    describe('setTimespanForGraphs()', () => {
        const fn = functions.setTimespanForGraphs;

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
            expect(fn(initialState, action)).toEqual(expectedState)
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
            expect(fn(initialState, action)).toEqual(expectedState)
        })
    });

    describe('setTimespanForGraphs()', () => {
        const fn = functions.setStartDateForGraphs;

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
            expect(fn(initialState, action)).toEqual(expectedState)
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
            expect(fn(state, action)).toEqual(expectedState)
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
            expect(fn(state, action)).toEqual(expectedState)
        });
    });

    describe('setCurrentDate()', () => {
        const fn = functions.setCurrentDate;

        it('should set current date', () => {
            expect(Math.floor(fn(initialState).selected.currentHourDateTime.getTime() / 100000000))
                .toEqual(Math.floor((new Date()).getTime() / 100000000));
            expect(fn(initialState).selected.currentHourDateTime.getDate()).toBeGreaterThanOrEqual((new Date()).getDate() - 1);
            expect(fn(initialState).selected.currentHourDateTime.getDate()).toBeLessThanOrEqual((new Date()).getDate() + 1);
        })
    });

    describe('fetchApiGraphDataStart()', () => {
        const fn = functions.fetchApiGraphDataStart;

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
            expect(fn(initialState)).toEqual(expectedState)
        })
    });

    describe('fetchApiGraphDataSuccess()', () => {
        const fn = functions.fetchApiGraphDataSuccess;

        // TODO
    });

    describe('fetchApiItemsDataStart()', () => {
        const fn = functions.fetchApiItemsDataStart;

        it('should set items loading to true', () => {
            const expectedState = {
                ...initialState,
                loading: {
                    ...initialState.loading,
                    items: true
                }
            };
            expect(fn(initialState)).toEqual(expectedState)
        })
    });

    describe('fetchApiItemsDataSuccess()', () => {
        const fn = functions.fetchApiItemsDataSuccess;

        // TODO
    });

    describe('fetchApiGraphDataFailed()', () => {
        const fn = functions.fetchApiGraphDataFailed;

        it('should set error to true and set the errorMessage', () => {

            const error = new Error('Test');
            const action = {
                type: Actions.SET_START_DATE_FOR_GRAPHS,
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
            expect(fn(initialState, action)).toEqual(expectedState)
        })
    });
});
