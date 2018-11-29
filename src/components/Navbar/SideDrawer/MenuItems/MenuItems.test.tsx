import * as React from 'react';
import {shallow} from 'enzyme';
import {menuItems, menuItemsJSX} from './menuItems';
import {ListItem} from '@material-ui/core';

describe('menuItems.tsx', () => {
    let wrapper: any;

    beforeEach(() => wrapper = shallow(<div>{menuItemsJSX}</div>));

    it('should be defined', () => {
        expect(menuItems).toBeDefined();
        expect(menuItemsJSX).toBeDefined();
    });
    it('should have 5 menuItems', () => {
        expect(menuItems).toHaveLength(5);
        expect(wrapper).toHaveLength(1);
    });
    it('should have 5 ListItem elements', () => {
        expect(wrapper.find(ListItem).length).toEqual(5);
    });
});
