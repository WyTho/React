import reducer from './index';
import Actions from '../../actionTypes';
import {darkTheme, lightTheme} from './functions';

describe('index.tsx (theme reducer)', () => {
    const initialState = {
        darkThemeActive: false,
        theme: lightTheme
    };

    describe('THEME_TOGGLE', () => {
        it('should toggle the theme from light to dark', () => {

            const action = {
                type: Actions.THEME_TOGGLE
            };
            const expectedState = {
                darkThemeActive: true,
                theme: darkTheme
            };
            expect(reducer(initialState, action)).toEqual(expectedState);
        });
        it('should toggle the theme from dark to light', () => {

            const action = {
                type: Actions.THEME_TOGGLE
            };
            const darkThemeState = {
                darkThemeActive: true,
                theme: darkTheme
            };
            expect(reducer(darkThemeState, action)).toEqual(initialState);
        });
    });

});
