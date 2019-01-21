import {
    Avatar,
    Icon,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    Typography
} from '@material-ui/core';
import * as React from 'react';
import {getIconNameForGroups, IPopupDataItems, PopupType} from '../../../../utils/popup/popup';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';

const itemListPopup = (props: IPassedPopupContentProps & IReduxPopupContentProps) => {
    const { popup, theme, items } = props;

    return (
        <div className='popupContent items'>
            <List>
                {([1, 0]).map(itemState => {
                    const key = itemState ? 'on' : 'off';
                    const partialItems = !items ? [] : items.filter(
                        item => (popup.data as IPopupDataItems)[key].find(i => i.id === item.id)
                    );
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
                                              onClick={() => { props.pushPopup({
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
                                                    {item.usages.find(u => u.consumption_type === 'KILOWATT').consumption_amount} Kwh
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
};

export default itemListPopup;
