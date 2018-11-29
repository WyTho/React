import functions from './functions';
import Actions from '../../actionTypes';
import {IPopup, PopupType} from '../../../utils/popup/popup';
import {IApiItemGroup, IApiItemUsage} from '../../../utils/data/dataTypes';

describe('functions.tsx (data reducer)', () => {
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
        const fn = functions.pushPopup;

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
            expect(fn(initialState, action)).toEqual(expectedState);
        });
    });
    describe('popPopup()', () => {
        const fn = functions.popPopup;

        it('should remove a popup from the list', () => {
            const copy = [...initialState.popups];
            copy.pop();
            const expectedState = { popups: copy };
            expect(fn(initialState)).toEqual(expectedState);
        });
    });

});
