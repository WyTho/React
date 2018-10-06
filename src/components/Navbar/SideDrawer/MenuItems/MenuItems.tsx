import * as React from 'react';
import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const menuItems = [
    { title: 'Overzicht', icon: 'dashboard' },
    { title: 'Ruimtes', icon: 'tune' },
    { title: 'Planning', icon: 'schedule' },
    { title: 'Toezicht', icon: 'remove_red_eye' },
    { title: 'Community', icon: 'people' }
];

export const mainListItems = menuItems.map((menuItem, index) => (
    <ListItem button key={index}>
        <ListItemIcon>
            <Icon>{menuItem.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={menuItem.title} />
    </ListItem>
));
