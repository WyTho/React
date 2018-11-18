
import Actions from '../../actionTypes';
import functions from './functions';
import {IPopupDataDatapoint, IPopupDataItems, PopupType} from '../../../utils/popup/popup';

export interface IPopup {
    type: PopupType
    title: string
    data: IPopupDataItems | IPopupDataDatapoint
}

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
