import {updateObject} from '../../utilities';
import {IPopup, IPopupReducerState} from './index';

export default {

    pushPopup: (oldState: IPopupReducerState, action: any) => {
        return updateObject(oldState, {
            popups: [ ...oldState.popups, action.payload.popup as IPopup ]
        });
    },
    popPopup: (oldState: IPopupReducerState) => {
        const copy = [ ...oldState.popups ];
        copy.pop();
        return updateObject(oldState, {
            popups: copy
        });
    }

}
