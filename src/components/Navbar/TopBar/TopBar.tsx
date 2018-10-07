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
    MenuItem,
    Icon
} from '@material-ui/core';

interface IProps {
    title: string,
    drawerOpened: boolean,
    darkThemeActive: boolean,
    handleDrawerOpen: any,
    handleThemeToggle: any
}

interface IState {
    mobileMenuAnchorEl: HTMLElement,
    menuItems: any[]
}

class TopBar extends React.Component<IProps & WithStyles, IState> {

    public state = {
        mobileMenuAnchorEl: null as HTMLElement,
        menuItems: [
            {
                key: 'notifications',
                text: 'Notificaties',
                icon: 'notifications',
                badge: {
                    amount: 11,
                    color: 'secondary'
                }
            },
            {
                key: 'theme',
                text: 'Donker thema',
                icon: 'brightness_2',
                whenDarkTheme: {
                    text: 'Licht thema',
                    icon: 'wb_sunny'
                }
            },
            {
                key: 'settings',
                text: 'Instellingen',
                icon: 'settings'
            },
        ]
    };

    public render() {
        const { classes, title, drawerOpened, darkThemeActive, handleDrawerOpen } = this.props;
        const { menuItems, mobileMenuAnchorEl } = this.state;

        const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

        const renderDesktopMenuItems = menuItems.map((menuItem: any) => {
            const icon = darkThemeActive && menuItem.key === 'theme' ?
                menuItem.whenDarkTheme.icon : menuItem.icon;

            let item = <Icon>{icon}</Icon>;

            if (menuItem.badge) {
                item = (
                    <Badge badgeContent={menuItem.badge.amount} color={menuItem.badge.color}>
                        <Icon>{icon}</Icon>
                    </Badge>
                );
            }
            return (
                <IconButton key={menuItem.key} color='inherit' onClick={() => this.handleButtonClick(menuItem.key)}>
                    {item}
                </IconButton>
            )
        });

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMenuAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}>
                {
                    menuItems.map((menuItem: any) => {
                        let text;
                        let icon;

                        if (darkThemeActive && menuItem.key === 'theme') {
                            text = menuItem.whenDarkTheme.text;
                            icon = menuItem.whenDarkTheme.icon;
                        } else {
                            text = menuItem.text;
                            icon = menuItem.icon;

                        }

                        let item = <Icon className={classes.iconPadding}>{icon}</Icon>;

                        if (menuItem.badge) {
                            item = (
                                <span className={classes.iconPadding}>
                                    <Badge badgeContent={menuItem.badge.amount} color={menuItem.badge.color}>
                                        <Icon>{icon}</Icon>
                                    </Badge>
                                </span>

                            );
                        }
                        return (
                            <MenuItem key={menuItem.key} onClick={() => this.handleButtonClick(menuItem.key)}>
                                { item }
                                <p>{text}</p>
                            </MenuItem>
                        )
                    })
                }
            </Menu>
        );

        return (
            <>
                <AppBar className={classNames(classes.appBar, drawerOpened && classes.appBarShift)}>
                    <Toolbar disableGutters={!drawerOpened}>

                        <IconButton color='inherit'
                                    aria-label='Open drawer'
                                    onClick={handleDrawerOpen}
                                    className={classNames(classes.toolbarSpacingLeft, drawerOpened && classes.hide)}>
                            <Icon>menu</Icon>
                        </IconButton>

                        <Typography variant='title' color='inherit' noWrap>
                            {title}
                        </Typography>

                        <div className={classes.grow} />

                        <div className={classes.sectionDesktop}>

                            {renderDesktopMenuItems}
                        </div>

                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup='true' onClick={this.handleMobileMenuOpen} color='inherit'>
                                <Icon>more_vert</Icon>
                            </IconButton>
                        </div>

                        <div className={classes.toolbarSpacingRight} />

                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </>
        );
    }

    private handleMobileMenuOpen = (event: any) => {
        this.setState({ mobileMenuAnchorEl: event.currentTarget });
    };

    private handleMobileMenuClose = () => {
        this.setState({ mobileMenuAnchorEl: null });
    };

    private handleButtonClick = (key: string) => {
        this.handleMobileMenuClose();

        if (key === 'theme') {
            this.props.handleThemeToggle();
        }
    }
}

export default TopBar;
