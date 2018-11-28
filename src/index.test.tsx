import * as React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import store from './store/initialize';
import App from './App';

describe('index.tsx (entry point)', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = shallow(<Provider store={store}><App/></Provider>);
    });
    it('should be defined', () => {
        expect(wrapper).toBeDefined();
    });
    it('should use the Redux provider', () => {
        expect(wrapper.find(Provider))
    });
    it('should render the App wrapped by the Provider without crashing', () => {
        expect(wrapper.find(Provider).find(App))
    });
});
