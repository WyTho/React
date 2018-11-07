import { Theme } from '@material-ui/core';
import Actions from '../../actionTypes';
import functions, { lightTheme } from './functions';

export interface IThemeReducerState {
    darkThemeActive: boolean,
    theme: Theme
}

const initialState: IThemeReducerState = {
    darkThemeActive: false,
    theme: lightTheme
};

const REDUCER = ( state: IThemeReducerState = initialState, action: any ) => {
    switch ( action.type ) {
        case Actions.THEME_TOGGLE : return functions.toggleTheme(state);
    }
    return state;
};

export default REDUCER;
