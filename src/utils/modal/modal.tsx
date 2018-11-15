import * as React from 'react';
import {IApiItem, IApiItemGroup} from '../data/dataTypes';
import {Avatar, Icon, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, Theme, Typography} from '@material-ui/core';

export enum ModalType {
    ITEM = 'ITEM',
    DATAPOINT = 'DATAPOINT'
}

export interface IModalDataItems {
    on: IApiItem[]
    off: IApiItem[]
}
export interface IModalDataDatapoint {
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

export const buildModalJsxFor = (type: ModalType, data: IModalDataItems | IModalDataDatapoint, theme: Theme) => {
    if (type === ModalType.ITEM) {
        return (
            <div className='modalContent items'>
                <List>
                    {([1, 0]).map(itemState => {
                        const key = itemState ? 'on' : 'off';
                        const partialItems = (data as IModalDataItems)[key];
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
        );
    } else if (type === ModalType.DATAPOINT) {
        return (
            <div className='modalContent datapoint'>
                <Typography variant='overline'>
                    {(data as IModalDataDatapoint).dateString ? (data as IModalDataDatapoint).dateString : null}
                </Typography>
                <Typography variant='h3'>
                    {(data as IModalDataDatapoint).value ? (data as IModalDataDatapoint).value : null}
                </Typography>
            </div>
        );
    } else {
        return <>Undefined modal type</>
    }
};
