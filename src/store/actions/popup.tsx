
import Actions from '../actionTypes';
import {IPopup} from '../../utils/popup/popup';

export const pushPopup = (popup: IPopup) => ({
    type: Actions.PUSH_POPUP,
    payload: { popup }
});

export const popPopup = () => ({
    type: Actions.POP_POPUP
});
