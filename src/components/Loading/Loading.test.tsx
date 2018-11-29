import * as React from 'react';
import {shallow} from 'enzyme';
import Loading from './Loading';
import {CircularProgress, LinearProgress} from '@material-ui/core';

describe('<Loading /> (functional component)', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallow(<Loading />);
    });
    it('should be defined', () => {
        expect(Loading).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a CircularProgress element when no props are passed', () => {
        expect(wrapper.find(CircularProgress).length).toEqual(1);
    });
    it('should have a LinearProgress element when type=\'bar\'', () => {
        expect(shallow(<Loading type='bar'/>).find(LinearProgress).length).toEqual(1);
    });
});
