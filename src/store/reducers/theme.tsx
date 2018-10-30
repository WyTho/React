import { updateObject } from '../utilities';

import { createMuiTheme, Theme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import teal from '@material-ui/core/colors/teal';
import Actions from '../actionTypes';

const defaultTheme = {
    palette: {
        primary: teal,
        secondary: {
            main: '#ef6c00',
        },
    },
    typography: {
        useNextVariants: true
    },
};

const lightTheme = createMuiTheme({
    ...defaultTheme
});

const darkTheme = createMuiTheme({
    ...defaultTheme,
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

const toggleTheme = (oldState: IState) => {
    let theme: Theme = lightTheme;
    const darkThemeActive: boolean = !oldState.darkThemeActive;
    if (darkThemeActive) theme = darkTheme;
    return updateObject(oldState, { darkThemeActive, theme });
};

const initialState = {
    darkThemeActive: false,
    theme: lightTheme
};

const REDUCER = ( state: IState = initialState, action: any ) => {
    switch ( action.type ) {
        case Actions.THEME_TOGGLE : return toggleTheme(state);
    }
    return state;
};

export default REDUCER;
