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
import GroupPopup from './GroupPopup/GroupPopup';
import {IApiGroup, IApiItem} from '../../../utils/data/dataTypes';

export interface IPassedPopupContentProps {
    popup: IPopup
}
export interface IReduxPopupContentProps {
    theme: Theme
    pushPopup: (popup: IPopup) => void
    popPopup: () => void
    addItemToGroup: (itemId: number, groupId: number) => void
    removeItemFromGroup: (itemId: number, groupId: number) => void
    removeGroup: (groupId: number) => void
    addGroup: (group: IApiGroup) => void
    editGroup: (groupId: number, group: IApiGroup) => void
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
            case PopupType.GROUP:
                popupContent = <GroupPopup {...props} />;
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
    popPopup: () => dispatch(actions.popPopup()),
    addItemToGroup: (itemId: number, groupId: number) => dispatch(actions.addItemToGroup(itemId, groupId)),
    removeItemFromGroup: (itemId: number, groupId: number) => dispatch(actions.removeItemFromGroup(itemId, groupId)),
    removeGroup: (groupId: number) => dispatch(actions.removeGroup(groupId)),
    addGroup: (group: IApiGroup) => dispatch(actions.addGroup(group)),
    editGroup: (groupId: number, group: IApiGroup) => dispatch(actions.editGroup(groupId, group)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PopupContent);
