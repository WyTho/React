import * as React from 'react';
import {IApiItem, IApiItemGroup} from '../data/dataTypes';

export interface IPopup {
    type: PopupType
    title: string
    data: IPopupDataItems | IPopupDataDatapoint | IApiItem
}

export interface IPopupDataItems {
    on: IApiItem[]
    off: IApiItem[]
}
export interface IPopupDataDatapoint {
    dateString: string
    value: string
}

export enum PopupType {
    ITEM = 'ITEM',
    ITEM_LIST = 'ITEM_LIST',
    DATAPOINT = 'DATAPOINT'
}

const groupIcons: any = {
    Verlichting: 'wb_incandescent'
};

export const getIconNameForGroups = (groups: IApiItemGroup[]) => {
    for (const groupName of Object.keys(groupIcons)) {
        if (groups.map(group => group.name).indexOf(groupName) !== -1) {
            return groupIcons[groupName]
        }
    }

    return 'device_unknown'
};
