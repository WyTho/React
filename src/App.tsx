import * as React from 'react';
import Layout from './components/Layout/Layout';
import {CssBaseline, MuiThemeProvider, createMuiTheme, Theme} from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';

import routes from './config.routes';

const lightTheme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: {
            main: '#ef6c00',
        },
    },
});
const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blue,
        secondary: {
            main: '#ef6c00',
        }
    },
});

interface IState {
    darkThemeActive: boolean,
    theme: Theme
}

export class App extends React.Component<{}, IState> {
    public state = {
        darkThemeActive: false,
        theme: lightTheme
    };

    public render() {
        const { theme, darkThemeActive } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Layout darkThemeActive={darkThemeActive} handleThemeToggle={this.toggleThemeHandler}>
                        { routes.map((route, i) =>
                            <Route exact={route.path === '/'}
                                   path={route.path}
                                   component={route.component}
                                   key={i}/>
                        )}
                    </Layout>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }

    private toggleThemeHandler = () => {
        this.setState(prevState => {
            if (prevState.darkThemeActive) {
                return {
                    darkThemeActive: false,
                    theme: lightTheme
                }
            } else {
                return {
                    darkThemeActive: true,
                    theme: darkTheme
                }
            }
        })
    }
}

export default App;
