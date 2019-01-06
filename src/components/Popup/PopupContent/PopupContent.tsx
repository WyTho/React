import * as React from 'react';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';
import {IPopup, PopupType} from '../../../utils/popup/popup';
import {Theme} from '@material-ui/core';
import ItemListPopup from './ItemListPopup/ItemListPopup';
import ItemPopup from './ItemPopup/ItemPopup';
import GraphDatapointPopup from './GraphDatapointPopup/GraphDatapointPopup';
import ManageItemGroupsPopup from './ManageItemGroupsPopup/ManageItemGroupsPopup';
import ManageGroupsPopup from './ManageGroupsPopup/ManageGroupsPopup';
import {IApiGroup, IApiItem} from '../../../utils/data/dataTypes';

export interface IPassedPopupContentProps {
    popup: IPopup
}
export interface IReduxPopupContentProps {
    theme: Theme
    pushPopup: (popup: IPopup) => void
    addItemToGroup: (itemId: number, groupId: number) => void
    removeItemFromGroup: (itemId: number, groupId: number) => void
    groups: IApiGroup[]
    items: IApiItem[]
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
            case PopupType.MANAGE_ITEM_GROUPS:
                popupContent = <ManageItemGroupsPopup {...props} />;
                break;
            case PopupType.MANAGE_GROUPS:
                popupContent = <ManageGroupsPopup {...props} />;
                break;
            default:
                popupContent = <>Undefined popup type</>
        }

        return popupContent;
    }

}

const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    const { groups, items } = state.data;
    return { theme, groups, items }
};
const mapDispatchToProps = (dispatch: any): Partial<IReduxPopupContentProps> => ({
    pushPopup: (popUp: IPopup) => dispatch(actions.pushPopup(popUp)),
    addItemToGroup: (itemId: number, groupId: number) => dispatch(actions.addItemToGroup(itemId, groupId)),
    removeItemFromGroup: (itemId: number, groupId: number) => dispatch(actions.removeItemFromGroup(itemId, groupId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PopupContent);
