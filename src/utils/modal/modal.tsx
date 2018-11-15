import * as React from 'react';
import {IApiItem} from '../data/dataTypes';
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
                                        <ListItem key={item.id} role={undefined} dense button onClick={() => { alert('clicked') }}>
                                            <Avatar>
                                                <Icon>device_unknown</Icon>
                                            </Avatar>
                                            <ListItemText primary={item.name} secondary={item.groups.map(g => g.name).join(', ')} />
                                            <ListItemSecondaryAction className='rightTextContainer'>
                                                <Typography variant='overline'>
                                                    {item.usages.find(u => u.usage_type === 'KILOWATT').usage} Kwh
                                                </Typography>
                                            </ListItemSecondaryAction>
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
