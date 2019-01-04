import * as React from 'react';
import {shallow} from 'enzyme';
import {Overzicht} from './Overzicht';
import {TimeSpan} from '../../utils/date/dateTypes';
import {lightTheme} from '../../store/reducers/theme/functions';

describe('<Overzicht /> (container)', () => {
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
    beforeEach(() => wrapper = shallow(<Overzicht {...props} />));
    it('should be defined', () => {
        expect(Overzicht).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a GridContainer element', () => {
        expect(wrapper.find('.GridContainer').length).toEqual(1);
    });
    it('should have a 5 GridItems elements', () => {
        expect(wrapper.find('.GridItem').length).toEqual(5);
    });
});
