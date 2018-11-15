import {createMuiTheme, Theme} from '@material-ui/core';
import {updateObject} from '../../utilities';
import {IThemeReducerState} from './index';
import * as colors from '@material-ui/core/colors';

const defaultTheme = {
    palette: {
        primary: colors.teal,
        secondary: colors.blue
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
        primary: colors.brown,
        secondary: colors.amber
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
