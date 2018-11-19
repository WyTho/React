import {updateObject} from '../../utilities';
import {IPopupReducerState} from './index';
import {IPopup} from '../../../utils/popup/popup';

export default {

    pushPopup: (oldState: IPopupReducerState, action: any) => {
        return updateObject(oldState, {
            popups: [ ...oldState.popups, action.payload.popup as IPopup ]
        });
    },
    popPopup: (oldState: IPopupReducerState) => {
        const popups = [ ...oldState.popups ];
        popups.pop();
        return updateObject(oldState, { popups });
    }

}
