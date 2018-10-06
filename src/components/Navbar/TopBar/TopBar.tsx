import * as React from 'react';
import classNames from 'classnames';
import {
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    WithStyles,
    Badge,
    Menu,
    MenuItem, Icon
} from '@material-ui/core';

interface IProps {
    title: string,
    drawerOpened: boolean,
    handleDrawerOpen: any
}

interface IState {
    menuDesktopEl: HTMLElement,
    menuMobileEl: HTMLElement
}

class TopBar extends React.Component<IProps & WithStyles, IState> {

    public state = {
        menuDesktopEl: null as HTMLElement,
        menuMobileEl: null as HTMLElement
    };

    public render() {
        const { classes, title, drawerOpened, handleDrawerOpen } = this.props;
        const { menuDesktopEl, menuMobileEl } = this.state;

        const isSettingsMenuOpen = Boolean(menuDesktopEl);
        const isMobileMenuOpen = Boolean(menuMobileEl);

        const renderSettingsMenu = (
            <Menu
                anchorEl={menuDesktopEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isSettingsMenuOpen}
                onClose={this.handleMenuClose}>
                <MenuItem onClick={this.handleMenuClose}>Test 1</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Test 2</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Test 3</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={menuMobileEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}>

                <MenuItem>
                    <IconButton color='inherit'>
                        <Badge className={classes.margin} badgeContent={11} color='secondary'>
                            <Icon>notifications</Icon>
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>

                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color='inherit'>
                        <Icon>settings</Icon>
                    </IconButton>
                    <p>Settings</p>
                </MenuItem>

            </Menu>
        );

        return (
            <>
                <AppBar className={classNames(classes.appBar, drawerOpened && classes.appBarShift)}>
                    <Toolbar disableGutters={!drawerOpened}>

                        <IconButton color='inherit'
                                    aria-label='Open drawer'
                                    onClick={handleDrawerOpen}
                                    className={classNames(classes.menuButton, drawerOpened && classes.hide)}>
                            <Icon>menu</Icon>
                        </IconButton>

                        <Typography variant='title' color='inherit' noWrap>
                            {title}
                        </Typography>

                        <div className={classes.grow} />

                        <div className={classes.sectionDesktop}>

                            <IconButton color='inherit'>
                                <Badge className={classes.margin} badgeContent={7} color='secondary'>
                                    <Icon>notifications</Icon>
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-owns={isSettingsMenuOpen ? 'material-appbar' : null}
                                aria-haspopup='true'
                                onClick={this.handleProfileMenuOpen}
                                color='inherit'>
                                <Icon>settings</Icon>
                            </IconButton>

                        </div>

                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup='true' onClick={this.handleMobileMenuOpen} color='inherit'>
                                <Icon>more_vert</Icon>
                            </IconButton>
                        </div>

                    </Toolbar>
                </AppBar>
                {renderSettingsMenu}
                {renderMobileMenu}
            </>
        );
    }
    private handleProfileMenuOpen = (event: any) => {
        this.setState({ menuDesktopEl: event.currentTarget });
    };

    private handleMenuClose = () => {
        this.setState({ menuDesktopEl: null });
        this.handleMobileMenuClose();
    };

    private handleMobileMenuOpen = (event: any) => {
        this.setState({ menuMobileEl: event.currentTarget });
    };

    private handleMobileMenuClose = () => {
        this.setState({ menuMobileEl: null });
    };
}

export default TopBar;
