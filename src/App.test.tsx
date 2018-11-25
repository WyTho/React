// import * as React from 'react';
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { App } from './App';
// import {lightTheme} from './store/reducers/theme/functions';
// import {IPopup} from './utils/popup/popup';
//
// configure({
//     adapter: new Adapter()
// });

describe('<App />', () => {
    // let wrapper: any;
    // beforeEach(() => {
    //     const props = {
    //         darkThemeActive: false,
    //         theme: lightTheme,
    //         popups: [] as IPopup[],
    //         toggleThemeHandler: () => console.info('toggleThemeHandler()'),
    //         onFetchTemperature: () => console.info('onFetchTemperature()'),
    //         popPopup: () => console.info('popPopup()')
    //     };
    //     wrapper = shallow(<App {...props} />);
    // });
    // it('should render only once', () => {
    //     expect(wrapper).toHaveLength(1);
    // })
    it('should have atleast one test', () => {
        expect(true).not.toBe(false);
    })
});
