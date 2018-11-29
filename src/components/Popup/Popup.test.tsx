import * as React from 'react';
import {shallow} from 'enzyme';
import Popup from './Popup';
import {Dialog, DialogTitle} from '@material-ui/core';

describe('<Popup /> (functional component)', () => {
    let wrapper: any;

    const children = (<>
        <h4>Hello</h4>
        <h4>World</h4>
    </>);
    const props = {
        onClosed: () => { return },
        opened: true,
        title: 'Hello'
    };
    beforeEach(() => wrapper = shallow(<Popup {...props} >{children}</Popup>));

    it('should be defined', () => {
        expect(Popup).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a Dialog element', () => {
        expect(wrapper.find(Dialog).length).toEqual(1);
    });
    it('should have a Dialog element', () => {
        expect(wrapper.find(Dialog).find(DialogTitle).length).toEqual(1);
    });
});
