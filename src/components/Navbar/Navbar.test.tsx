import * as React from 'react';
import {shallow} from 'enzyme';
import {Navbar} from './Navbar';
import TopBar from './TopBar/TopBar';
import SideDrawer from './SideDrawer/SideDrawer';

describe('<Navbar /> (component)', () => {
    let wrapper: any;

    const children = (<>
        <h4>Hello</h4>
        <h4>World</h4>
    </>);

    const props = {
        classes: {},
        darkThemeActive: false,
        handleThemeToggle: () => { return }
    };
    const state = {
        title: 'Hello',
        drawerOpened: true
    };
    beforeEach(() => {
        wrapper = shallow(<Navbar {...props} >{children}</Navbar>);
        wrapper.setState(state)
    });
    it('should be defined', () => {
        expect(Navbar).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a TopBar element', () => {
        expect(wrapper.find(TopBar).length).toEqual(1);
    });
    it('should have a SideDrawer element', () => {
        expect(wrapper.find(SideDrawer).length).toEqual(1);
    });
    it('should have a main element', () => {
        expect(wrapper.find('main').length).toEqual(1);
    });
});
