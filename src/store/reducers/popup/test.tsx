import reducer from './index';
import Actions from '../../actionTypes';
import {IPopup, PopupType} from '../../../utils/popup/popup';
import {IApiItemGroup, IApiItemUsage} from '../../../utils/data/dataTypes';

describe('index.tsx (popup reducer)', () => {
    const popup = {
        type: PopupType.ITEM,
        title: 'Hello World',
        data: {
            id: 0,
            name: '',
            address: '',
            comment: '',
            last_use: {
                last_used: 0,
                last_use: {
                    datatype: '',
                    data: {}
                }
            },
            usages: [] as IApiItemUsage[],
            groups: [] as IApiItemGroup[]
        }
    } as IPopup;

    const initialState = {
        popups: [{...popup}, {...popup}, {...popup}] as IPopup[]
    };

    describe('pushPopup()', () => {
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
    describe('popPopup()', () => {
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
