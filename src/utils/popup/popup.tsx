import * as React from 'react';
import {IApiItem, IApiItemGroup} from '../data/dataTypes';
import Popup from '../../components/Popup/Popup';
import {
    Avatar,
    Icon,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    Theme,
    Typography
} from '@material-ui/core';

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
const getIconNameForGroups = (groups: IApiItemGroup[]) => {
    const groupNames = groups.map(group => group.name);
    console.log(groups);
    if (groupNames.indexOf('Verlichting') !== -1) {
        return 'wb_incandescent'
    }
    return 'device_unknown'
};

export const buildPopupJsxFor = (type: PopupType, data: IPopupDataItems | IPopupDataDatapoint, theme: Theme) => {
    if (type === PopupType.ITEM_LIST) {
        return (
            <>
                <div className='popupContent items'>
                    <List>
                        {([1, 0]).map(itemState => {
                            const key = itemState ? 'on' : 'off';
                            const partialItems = (data as IPopupDataItems)[key];
                            const subHeaderForState = (
                                <ListSubheader style={{ background: theme.palette.background.paper }}>
                                    {itemState ? 'Actief' : 'Inactief'}
                                </ListSubheader>
                            );
                            return (
                                <li className='listSection' key={key}>
                                    <ul>
                                        { partialItems.length ? subHeaderForState : null }
                                        { partialItems.map(item => (
                                            <ListItem key={item.id}
                                                      role={undefined}
                                                      dense
                                                      button
                                                      onClick={() => { alert(`item ${item.id} clicked`) }}>
                                                <Avatar style={{backgroundColor: theme.palette.background.paper}}>
                                                    <Icon color={itemState ? 'secondary' : 'disabled'}>
                                                        {getIconNameForGroups(item.groups)}
                                                        </Icon>
                                                </Avatar>
                                                <ListItemText primary={item.name} secondary={item.groups.map(g => g.name).join(', ')} />
                                                { itemState ? (
                                                    <ListItemSecondaryAction className='rightTextContainer'>
                                                        <Typography variant='overline'>
                                                            {item.usages.find(u => u.usage_type === 'KILOWATT').usage} Kwh
                                                        </Typography>
                                                    </ListItemSecondaryAction>
                                                ) : null }
                                            </ListItem>
                                        )) }
                                    </ul>
                                </li>
                            )
                        })}
                    </List>
                </div>
                <Popup title={'Loading...'}
                       opened={true}
                       onClosed={() => console.log('closing')}>
                    hi
                </Popup>
            </>

        );
    } else if (type === PopupType.DATAPOINT) {
        return (
            <div className='popupContent datapoint'>
                <Typography variant='overline'>
                    {(data as IPopupDataDatapoint).dateString ? (data as IPopupDataDatapoint).dateString : null}
                </Typography>
                <Typography variant='h3'>
                    {(data as IPopupDataDatapoint).value ? (data as IPopupDataDatapoint).value : null}
                </Typography>
            </div>
        );
    } else {
        return <>Undefined popup type</>
    }
};
