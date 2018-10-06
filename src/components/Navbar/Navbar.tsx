import * as React from 'react';
import { WithStyles, withStyles } from '@material-ui/core';
import SideDrawer from './SideDrawer/SideDrawer';
import TopBar from './TopBar/TopBar';
import styles from './Navbar.styles';

interface IState {
    drawerOpened: boolean
}

class Navbar extends React.Component<{} & WithStyles, IState> {
    public state = {
        title: 'Selficient Dashboard',
        drawerOpened: false
    };

    public render() {
        const { title, drawerOpened } = this.state;
        const { classes, children } = this.props;

        return (
            <div className={classes.root}>

                <TopBar
                    title={title}
                    classes={classes}
                    drawerOpened={drawerOpened}
                    handleDrawerOpen={this.handleDrawerOpen}/>

                <SideDrawer
                    classes={classes}
                    drawerOpened={drawerOpened}
                    handleDrawerClose={this.handleDrawerClose}/>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
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
