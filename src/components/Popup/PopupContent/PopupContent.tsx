import * as React from 'react';
import * as actions from '../../../store/actions';
import {IPopup} from '../../../store/reducers/popup';
import {connect} from 'react-redux';
import {PopupType} from '../../../utils/popup/popup';
import {Theme} from '@material-ui/core';
import ItemListPopup from './ItemListPopup/ItemListPopup';
import ItemPopup from './ItemPopup/ItemPopup';
import GraphDatapointPopup from './GraphDatapointPopup/GraphDatapointPopup';

export interface IPassedPopupContentProps {
    popup: IPopup
}
export interface IReduxPopupContentProps {
    theme: Theme
    pushPopup: (popup: IPopup) => void
}
export class PopupContent extends React.Component<IPassedPopupContentProps & IReduxPopupContentProps, {}> {

    public render() {
        const { props, props: { popup } } = this;
        let popupContent = <></>;
        switch (popup.type) {
            case PopupType.ITEM_LIST:
                popupContent = <ItemListPopup {...props} />;
                break;
            case PopupType.ITEM:
                popupContent = <ItemPopup {...props} />;
                break;
            case PopupType.DATAPOINT:
                popupContent = <GraphDatapointPopup {...props} />;
                break;
            default:
                popupContent = <>Undefined popup type</>
        }
        if (popup.type === PopupType.ITEM_LIST) {
            popupContent = <ItemListPopup {...props} />
        }

        return popupContent;
    }

}

const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    return { theme }
};
const mapDispatchToProps = (dispatch: any): Partial<IReduxPopupContentProps> => ({
    pushPopup: (popUp: IPopup) => dispatch(actions.pushPopup(popUp))
});
export default connect(mapStateToProps, mapDispatchToProps)(PopupContent);
