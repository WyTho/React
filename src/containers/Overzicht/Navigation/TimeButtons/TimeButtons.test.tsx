import * as React from 'react';
import {shallow} from 'enzyme';
import TimeButtons from './TimeButtons';
import {TimeSpan} from '../../../../utils/date/dateTypes';
import {lightTheme} from '../../../../store/reducers/theme/functions';
import {Button, IconButton} from '@material-ui/core';

describe('<TimeButtons /> (functional component)', () => {
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
        pushPopup: () => { return }
    };
    beforeEach(() => wrapper = shallow(<TimeButtons {...props} />));
    it('should be defined', () => {
        expect(TimeButtons).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have 3 IconButton elements', () => {
        expect(wrapper.find(IconButton).length).toEqual(3);
    });
    it('should have a 1 Button element', () => {
        expect(wrapper.find(Button).length).toEqual(1);
    });
    it('should have a loadingContainer if initial loading or partial loading is true', () => {
        const loadingProps = {
            ...props,
            loading: {
                initial: true,
                partial: true
            },
        };
        const loadingWrapper = shallow(<TimeButtons {...loadingProps} />);
        expect(loadingWrapper.find('div.loadingContainer').length).toEqual(1);

        const loadingInitialProps = {
            ...props,
            loading: {
                ...props.loading,
                initial: true
            },
        };
        const loadingInitialWrapper = shallow(<TimeButtons {...loadingInitialProps} />);
        expect(loadingInitialWrapper.find('div.loadingContainer').length).toEqual(1);

        const loadingPartialProps = {
            ...props,
            loading: {
                ...props.loading,
                partial: true
            },
        };
        const loadingPartialWrapper = shallow(<TimeButtons {...loadingPartialProps} />);
        expect(loadingPartialWrapper.find('div.loadingContainer').length).toEqual(1);
    });
});
