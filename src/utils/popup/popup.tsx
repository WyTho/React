import * as React from 'react';
import {IApiItem, IApiItemGroup} from '../data/dataTypes';
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
import {IPopup} from '../../store/reducers/popup';
import {beautifyDate} from '../date/date';

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

export const buildPopupJsxFor = (popup: IPopup, theme: Theme, pushPopup: any ) => {
    if (popup.type === PopupType.ITEM_LIST) {
        return (
            <>
                <div className='popupContent items'>
                    <List>
                        {([1, 0]).map(itemState => {
                            const key = itemState ? 'on' : 'off';
                            const partialItems = (popup.data as IPopupDataItems)[key];
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
                                                      onClick={() => { pushPopup({
                                                          type: PopupType.ITEM,
                                                          title: item.name,
                                                          data: item
                                                      }) }}>
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
            </>
        );
    } else if (popup.type === PopupType.ITEM) {
        const item: IApiItem = (popup.data as IApiItem);

        return (
            <div className='popupContent item'>

                <Typography variant='overline' color='primary'>
                    information
                </Typography>
                <Typography variant='overline'>
                    id: {item.id ? item.id : null}
                </Typography>
                <Typography variant='overline'>
                    name: {item.name ? item.name : null}
                </Typography>
                <Typography variant='overline'>
                    address: {item.address ? item.address : null}
                </Typography>
                <Typography variant='overline'>
                    comment: {item.comment ? item.comment : null}
                </Typography>

                <Typography variant='overline' color='primary'>
                    Laatste verbruik ({item.last_use.last_use.datatype ? item.last_use.last_use.datatype : null})
                </Typography>
                <Typography variant='overline'>
                    last_use: {item.last_use.last_use.data ? item.last_use.last_use.data : null}
                    {item.last_use.last_used ? `(${beautifyDate(new Date(item.last_use.last_used * 1000), '{DATE}')})` : null}
                </Typography>

                <Typography variant='overline' color='primary'>
                    usages
                </Typography>
                {item.usages.map(usage => (
                    <Typography key={usage.usage_type} variant='overline'>
                        {usage.usage_type ? usage.usage_type : null}: {usage.usage ? usage.usage : null}
                    </Typography>
                ))}

                <Typography variant='overline' color='primary'>
                    groups
                </Typography>
                {item.groups.map(group => (
                    <Typography key={group.name} variant='overline'>
                        {group.name ? group.name : null}
                    </Typography>
                ))}
            </div>
        );
    } else if (popup.type === PopupType.DATAPOINT) {
        return (
            <div className='popupContent datapoint'>
                <Typography variant='overline'>
                    {(popup.data as IPopupDataDatapoint).dateString ? (popup.data as IPopupDataDatapoint).dateString : null}
                </Typography>
                <Typography variant='h3'>
                    {(popup.data as IPopupDataDatapoint).value ? (popup.data as IPopupDataDatapoint).value : null}
                </Typography>
            </div>
        );
    } else {
        return <>Undefined popup type</>
    }
};
