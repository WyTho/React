import * as actions from './index';
import Actions from '../actionTypes';
import {IPopup, PopupType} from '../../utils/popup/popup';
import {TimeSpan} from '../../utils/date/dateTypes';
import {
    fetchApiDataFailed,
    fetchApiGraphDataStart,
    fetchApiGraphDataSuccess,
    fetchApiItemsDataStart,
    fetchApiItemsDataSuccess
} from './data';

describe('theme actions', () => {
    describe('actions.toggleTheme()', () => {
        it('should create an action object with the correct type', () => {
            expect(actions.toggleTheme()).toEqual({
                type: Actions.THEME_TOGGLE
            })
        })
    })
});
describe('popup actions', () => {
    describe('actions.pushPopup()', () => {
        it('should create an action object with the correct type & payload', () => {
            const popup: IPopup = {
                type: PopupType.DATAPOINT,
                title: 'something',
                data: {
                    dateString: 'something',
                    value: 'something'
                }
            };
            expect(actions.pushPopup(popup)).toEqual({
                type: Actions.PUSH_POPUP,
                payload: { popup }
            })
        })
    });
    describe('actions.popPopup()', () => {
        it('should create an action object with the correct type', () => {
            expect(actions.popPopup()).toEqual({
                type: Actions.POP_POPUP
            })
        })
    });
});
describe('data actions', () => {
    describe('actions.setTimeSpanForGraphs()', () => {
        it('should create an action object with the correct type & payload', () => {
            const timeSpan = TimeSpan.week;
            expect(actions.setTimeSpanForGraphs(timeSpan)).toEqual({
                type: Actions.SET_TIMESPAN_FOR_GRAPHS,
                payload: { timeSpan }
            })
        })
    });
    describe('actions.setStartDateForGraphs()', () => {
        it('should create an action object with the correct type & payload', () => {
            const startDate = new Date();
            expect(actions.setStartDateForGraphs(startDate)).toEqual({
                type: Actions.SET_START_DATE_FOR_GRAPHS,
                payload: { startDate }
            })
        })
    });
    describe('actions.setCurrentDate()', () => {
        it('should create an action object with the correct type', () => {
            expect(actions.setCurrentDate()).toEqual({
                type: Actions.SET_CURRENT_DATE
            })
        })
    });
    describe('fetch()', () => {
        describe('fetchApiGraph()', () => {
            it('should create an action object with the correct type on start', () => {
                expect(fetchApiGraphDataStart()).toEqual({
                    type: Actions.FETCH_API_GRAPH_DATA_START
                })
            });
            it('should create an action object with the correct type on success', () => {
                const typesOfData: any = [];
                const data: any = [];
                expect(fetchApiGraphDataSuccess(typesOfData, data)).toEqual({
                    type: Actions.FETCH_API_GRAPH_DATA_SUCCESS,
                    payload: { typesOfData, data }
                })
            });
        });
        describe('fetchApiItems()', () => {
            it('should create an action object with the correct type on start', () => {
                expect(fetchApiItemsDataStart()).toEqual({
                    type: Actions.FETCH_API_ITEMS_DATA_START
                })
            });
            it('should create an action object with the correct type on success', () => {
                const data: any = [];
                expect(fetchApiItemsDataSuccess(data)).toEqual({
                    type: Actions.FETCH_API_ITEMS_DATA_SUCCESS,
                    payload: { data }
                })
            });
        });
        it('should create an action object with the correct type on error', () => {
            const error: any = {};
            expect(fetchApiDataFailed(error)).toEqual({
                type: Actions.FETCH_API_DATA_FAILED,
                payload: { error }
            })
        });
    });
});
