import * as React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import {lightTheme} from './store/reducers/theme/functions';
import {IPopup} from './utils/popup/popup';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';

describe('<App />', () => {
    let wrapper: any;
    beforeEach(() => {
        const props = {
            darkThemeActive: false,
            theme: lightTheme,
            popups: [] as IPopup[],
            toggleThemeHandler: () => { return },
            onFetchTemperature: () => { return },
            popPopup: () => { return }
        };
        wrapper = shallow(<App {...props} />);
    });
    it('should be defined', () => {
        expect(App).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a MuiThemeProvider from @material/ui', () => {
        expect(wrapper.find(MuiThemeProvider).length).toEqual(1);
    });
    it('should have a CssBaseline from @material/ui', () => {
        expect(wrapper.find(CssBaseline).length).toEqual(1);
    });
    it('should have a BrowserRouter wrapped by the MuiThemeProvider', () => {
        expect(wrapper.find(MuiThemeProvider).find(BrowserRouter).length).toEqual(1);
    });
    it('should have a Layout-component wrapped by the BrowserRouter', () => {
        expect(wrapper.find(BrowserRouter).find(Layout).length).toEqual(1);
    });
});
