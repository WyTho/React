import * as React from 'react';
import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import './menuItems.scss';

export const menuItems = [
    { path: '/', title: 'Overzicht', icon: 'dashboard' },
    { path: '/ruimtes', title: 'Ruimtes', icon: 'tune' },
    { path: '/planning', title: 'Planning', icon: 'schedule' },
    { path: '/toezicht', title: 'Toezicht', icon: 'remove_red_eye' },
    { path: '/community', title: 'Community', icon: 'people' }
];

export const menuItemsJSX = menuItems.map((menuItem, index) => (
    <ListItem
        className={'menuItem'}
        button
        key={index}
        component={
            ({innerRef, ...props}) =>
                <NavLink
                    {...props}
                    to={menuItem.path}
                    exact={menuItem.path === '/'} />
        }>
            <ListItemIcon>
                <Icon>{menuItem.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={menuItem.title} />
    </ListItem>
));

export default menuItemsJSX;
