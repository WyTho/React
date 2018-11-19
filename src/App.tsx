import * as React from 'react';
import Layout from './components/Layout/Layout';
import { CssBaseline, MuiThemeProvider, Theme } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import routes from './config.routes';
import Popup from './components/Popup/Popup';
import {IPopup} from './store/reducers/popup';
import PopupContent from './components/Popup/PopupContent/PopupContent';

interface IProps {
    darkThemeActive: boolean
    theme: Theme
    popups: IPopup[]
    toggleThemeHandler: () => void
    onFetchTemperature: () => void
    popPopup: () => void
}

export class App extends React.Component<IProps, {}> {

    public render() {
        const { props, props: { theme, popups, darkThemeActive } } = this;

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
                { popups.map((popup, i) =>
                    <Popup key={i}
                           title={popup.title ? popup.title : 'Loading...'}
                           opened={true}
                           onClosed={props.popPopup}>
                        <PopupContent popup={popup} />
                    </Popup>
                )}
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state: any) => {
    const { theme, darkThemeActive } = state.theme;
    const { popups } = state.popup;
    return { theme, darkThemeActive, popups }
};

const mapDispatchToProps = (dispatch: any): Partial<IProps> => ({
    toggleThemeHandler: () => dispatch(actions.toggleTheme()),
    popPopup: () => dispatch(actions.popPopup())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
