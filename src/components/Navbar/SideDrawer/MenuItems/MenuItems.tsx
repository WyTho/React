import * as React from 'react';
import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const menuItems = [
    { path: '/', title: 'Overzicht', icon: 'dashboard' },
    { path: '/ruimtes', title: 'Ruimtes', icon: 'tune' },
    { path: '/planning', title: 'Planning', icon: 'schedule' },
    { path: '/toezicht', title: 'Toezicht', icon: 'remove_red_eye' },
    { path: '/community', title: 'Community', icon: 'people' }
];

export const mainListItems = menuItems.map((menuItem, index) => (
    <ListItem button key={index} component={({innerRef, ...props}) => <Link {...props} to={menuItem.path} />}>
            <ListItemIcon>
                <Icon>{menuItem.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={menuItem.title} />
    </ListItem>
));
