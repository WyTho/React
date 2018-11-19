
import Actions from '../../actionTypes';
import functions from './functions';
import {IPopup} from '../../../utils/popup/popup';

export interface IPopupReducerState {
    popups: IPopup[]
}

const initialState: IPopupReducerState = {
    popups: []
};

const REDUCER = ( state: IPopupReducerState = initialState, action: any ) => {
    switch ( action.type ) {
        case Actions.PUSH_POPUP : return functions.pushPopup(state, action);
        case Actions.POP_POPUP  : return functions.popPopup(state);
    }
    return state;
};

export default REDUCER;
