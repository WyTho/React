import * as React from 'react';
import classNames from 'classnames';
import {
    Divider,
    Drawer,
    Icon,
    IconButton,
    List,
    WithStyles
} from '@material-ui/core';
import menuItems from './MenuItems/MenuItems';

interface IProps {
    drawerOpened: boolean,
    handleDrawerClose: any
}

const sideDrawer = (props: IProps & WithStyles) => {
    const { classes, drawerOpened, handleDrawerClose } = props;

    return (
        <Drawer
            variant='permanent'
            classes={{ paper: classNames(classes.drawerPaper, !drawerOpened && classes.drawerPaperClose) }}
            open={drawerOpened}>
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    <Icon>chevron_left</Icon>
                </IconButton>
            </div>
            <Divider />
            <List>
                {menuItems}
            </List>
        </Drawer>
    );
};

export default sideDrawer;
