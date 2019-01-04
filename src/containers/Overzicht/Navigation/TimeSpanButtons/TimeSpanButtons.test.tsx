import * as React from 'react';
import {shallow} from 'enzyme';
import TimeSpanButtons from './TimeSpanButtons';
import {TimeSpan} from '../../../../utils/date/dateTypes';
import {lightTheme} from '../../../../store/reducers/theme/functions';
import {Button} from '@material-ui/core';

describe('<TimeSpanButtons /> (functional component)', () => {
    let wrapper: any;

    const props = {
        theme: lightTheme,
        selected: {
            timeSpan: TimeSpan.day,
            graphStartDateTime: new Date(),
            currentDateTime: new Date()
        },
        loading: {
            initial: false,
            partial: false
        },
        error: {
            status: false,
            error: null as Error,
            message: null as string
        },
        setTimeSpan: () => { return },
        setStartDate: () => { return },
        fetchApiGraphData: () => { return },
        fetchApiItemsData: () => { return },
        fetchApiGroupsData: () => { return },
        pushPopup: () => { return }
    };
    beforeEach(() => wrapper = shallow(<TimeSpanButtons {...props} />));
    it('should be defined', () => {
        expect(TimeSpanButtons).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have 3 Button elements with class timeToggleButton', () => {
        expect(wrapper.find(Button).length).toEqual(3);
        wrapper.find(Button).forEach((btn: any) => {
            expect(btn.hasClass('timeToggleButton')).toBeTruthy()
        });
    });
});
