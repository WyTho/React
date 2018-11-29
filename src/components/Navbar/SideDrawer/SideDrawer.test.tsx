import * as React from 'react';
import {shallow} from 'enzyme';
import SideDrawer from './SideDrawer';
import {Drawer, List} from '@material-ui/core';

describe('<SideDrawer /> (functional component)', () => {
    let wrapper: any;

    const children = (<>
        <h4>Hello</h4>
        <h4>World</h4>
    </>);
    const props = {
        drawerOpened: true,
        handleDrawerClose: () => { return },
        classes: {}
    };
    beforeEach(() => wrapper = shallow(<SideDrawer {...props} >{children}</SideDrawer>));

    it('should be defined', () => {
        expect(SideDrawer).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a Drawer element', () => {
        expect(wrapper.find(Drawer).length).toEqual(1);
    });
    it('should have a List element for displaying the menu items', () => {
        expect(wrapper.find(List).length).toEqual(1);
    });
});
