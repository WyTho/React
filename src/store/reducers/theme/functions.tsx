import teal from '@material-ui/core/colors/teal';
import blue from '@material-ui/core/colors/blue';
import {createMuiTheme, Theme} from '@material-ui/core';
import {updateObject} from '../../utilities';
import {IThemeReducerState} from './index';

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

export const lightTheme = createMuiTheme({
    ...defaultTheme
});

export const darkTheme = createMuiTheme({
    ...defaultTheme,
    palette: {
        type: 'dark',
        primary: blue,
        secondary: {
            main: '#ef6c00',
        }
    },
});

export default {

    toggleTheme: (oldState: IThemeReducerState) => {
        let theme: Theme = lightTheme;
        const darkThemeActive: boolean = !oldState.darkThemeActive;
        if (darkThemeActive) theme = darkTheme;
        return updateObject(oldState, { darkThemeActive, theme });
    }

}
