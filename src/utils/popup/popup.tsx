import * as React from 'react';
import {IApiItem, IApiItemGroup} from '../data/dataTypes';

export enum PopupType {
    ITEM_LIST = 'ITEM_LIST',
    ITEM = 'ITEM',
    DATAPOINT = 'DATAPOINT'
}

export interface IPopupDataItems {
    on: IApiItem[]
    off: IApiItem[]
}
export interface IPopupDataDatapoint {
    dateString: string
    value: string
}
export const getIconNameForGroups = (groups: IApiItemGroup[]) => {
    const groupNames = groups.map(group => group.name);
    console.log(groups);
    if (groupNames.indexOf('Verlichting') !== -1) {
        return 'wb_incandescent'
    }
    return 'device_unknown'
};
