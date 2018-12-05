import reducer from './index';
import Actions from '../../actionTypes';
import {IPopup, PopupType} from '../../../utils/popup/popup';
import {IApiItem, IApiItemGroup, IApiItemUsage} from '../../../utils/data/dataTypes';

describe('index.tsx (popup reducer)', () => {
    const popup = {
        type: PopupType.ITEM,
        title: 'Hello World',
        data: {
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
        } as IApiItem
    } as IPopup;

    const initialState = {
        popups: [{...popup}, {...popup}, {...popup}] as IPopup[]
    };

    describe('PUSH_POPUP', () => {
        it('should add a popup to the list', () => {

            const action = {
                type: Actions.PUSH_POPUP,
                payload: { popup }
            };
            const expectedState = {
                popups: [
                    ...initialState.popups,
                    popup
                ]
            };
            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });
    describe('POP_POPUP', () => {
        it('should remove a popup from the list', () => {
            const action = {
                type: Actions.POP_POPUP
            };
            const copy = [...initialState.popups];
            copy.pop();
            const expectedState = { popups: copy };
            expect(reducer(initialState, action)).toEqual(expectedState);
        });
    });

});
