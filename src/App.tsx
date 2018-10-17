import * as React from 'react';
import Layout from './components/Layout/Layout';
import { CssBaseline, MuiThemeProvider, Theme } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import routes from './config.routes';

interface IProps {
    darkThemeActive: boolean,
    theme: Theme,
    toggleThemeHandler: () => void,
    onFetchTemperature: () => void
}

export class App extends React.Component<IProps, {}> {

    public componentDidMount() {
        this.props.onFetchTemperature();
    }

    public render() {
        const { props, props: { theme, darkThemeActive } } = this;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Layout darkThemeActive={darkThemeActive} handleThemeToggle={props.toggleThemeHandler}>
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
}

const mapStateToProps = (state: any) => {
    const { theme, darkThemeActive } = state.theme;
    return { theme, darkThemeActive }
};

const mapDispatchToProps = (dispatch: any): Partial<IProps> => ({
    toggleThemeHandler: () => dispatch(actions.toggleTheme()),
    onFetchTemperature: () => dispatch(actions.fetchTemperature())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
