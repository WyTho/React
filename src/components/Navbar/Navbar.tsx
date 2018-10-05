import * as React from 'react';
import classNames from 'classnames';
import {
    Drawer,
    Divider,
    List,
    Typography,
    AppBar,
    Toolbar,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    WithStyles,
    withStyles, Badge, Input, Menu, MenuItem
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import styles from './Navbar.styles'
import {mainListItems} from './NavbarIItems/NavbarItems';

interface IState {
    open: boolean
    anchorEl: HTMLElement,
    mobileMoreAnchorEl: HTMLElement
}

class Navbar extends React.Component<{} & WithStyles, IState> {
    public state = {
        open: false,
        anchorEl: null as HTMLElement,
        mobileMoreAnchorEl: null as HTMLElement
    };

    public render() {
        const { children } = this.props;
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton color='inherit'>
                        <Badge className={classes.margin} badgeContent={4} color='secondary'>
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton color='inherit'>
                        <Badge className={classes.margin} badgeContent={11} color='secondary'>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color='inherit'>
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton color='inherit'
                                    aria-label='Open drawer'
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='title' color='inherit' noWrap>
                            Selficient Dashboard
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <Input
                                placeholder='Search…'
                                disableUnderline
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton color='inherit'>
                                <Badge className={classes.margin} badgeContent={4} color='secondary'>
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton color='inherit'>
                                <Badge className={classes.margin} badgeContent={17} color='secondary'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : null}
                                aria-haspopup='true'
                                onClick={this.handleProfileMenuOpen}
                                color='inherit'
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup='true' onClick={this.handleMobileMenuOpen} color='inherit'>
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
                <Drawer
                    variant='permanent'
                    classes={{ paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose) }}
                    open={this.state.open}>
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {mainListItems}
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText inset primary='Inbox' />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    { children }
                </main>
            </div>
        );
    }

    private handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    private handleDrawerClose = () => {
        this.setState({ open: false });
    };

    private handleProfileMenuOpen = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    private handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    private handleMobileMenuOpen = (event: any) => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    private handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };
}

export default withStyles(styles)(Navbar);
