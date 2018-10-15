import * as React from 'react';
import { WithStyles, withStyles } from '@material-ui/core';
import SideDrawer from './SideDrawer/SideDrawer';
import TopBar from './TopBar/TopBar';
import styles from './Navbar.styles';

interface IState {
    drawerOpened: boolean
}

interface IProps {
    darkThemeActive: boolean,
    handleThemeToggle: any
}

class Navbar extends React.Component<IProps & WithStyles, IState> {
    public state = {
        title: 'Selficient Dashboard',
        drawerOpened: false
    };

    public render() {
        const { title, drawerOpened } = this.state;
        const { classes, children, darkThemeActive, handleThemeToggle } = this.props;

        return (
            <div className={classes.root}>

                <TopBar
                    title={title}
                    classes={classes}
                    drawerOpened={drawerOpened}
                    handleDrawerOpen={this.handleDrawerOpen}
                    darkThemeActive={darkThemeActive}
                    handleThemeToggle={handleThemeToggle}/>

                <SideDrawer
                    classes={classes}
                    drawerOpened={drawerOpened}
                    handleDrawerClose={this.handleDrawerClose}/>

                <div className={classes.toolbar} />
                <main className={classes.content}>
                    { children }
                </main>

            </div>
        );
    }

    private handleDrawerOpen = () => {
        this.setState({ drawerOpened: true });
    };

    private handleDrawerClose = () => {
        this.setState({ drawerOpened: false });
    };
}

export default withStyles(styles)(Navbar);
