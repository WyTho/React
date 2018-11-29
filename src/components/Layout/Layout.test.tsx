import * as React from 'react';
import {shallow} from 'enzyme';
import Layout from './Layout';
import Navbar from '../Navbar/Navbar';

describe('<Layout /> (functional component)', () => {
    let wrapper: any;

    const children = (<>
        <h4>Hello</h4>
        <h4>World</h4>
    </>);

    const props = {};
    beforeEach(() => wrapper = shallow(<Layout {...props} >{children}</Layout>));

    it('should be defined', () => {
        expect(Layout).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a Navbar element', () => {
        expect(wrapper.find(Navbar).length).toEqual(1);
    });
});
