import * as React from 'react';
import {shallow} from 'enzyme';
import {ChartForKlimaatbeheer} from './ChartForKlimaatbeheer';
import {TimeSpan} from '../../../../utils/date/dateTypes';
import {lightTheme} from '../../../../store/reducers/theme/functions';
import ChartCard from '../../../../components/ChartCard/ChartCard'
import {DataSet} from '../../../../utils/data/apiGraph';
import {IApiGraph} from '../../../../utils/data/dataTypes';
import {Grid} from '@material-ui/core';

describe('<ChartForKlimaatbeheer /> (component)', () => {
    let wrapper: any;

    const props = {
        theme: lightTheme,
        fetchApiGraphData: () => { return },
        openPopup: () => { return },
        selected: {
            timeSpan: TimeSpan.day,
            graphStartDateTime: new Date(),
            currentHourDateTime: new Date()
        },
        loading: {
            initial: false,
            partial: false
        },
        error: false,
        dataset: {
            [DataSet.AVERAGE_TEMPERATURE]: null as IApiGraph
        }
    };
    beforeEach(() => wrapper = shallow(<ChartForKlimaatbeheer {...props} />));
    it('should be defined', () => {
        expect(ChartForKlimaatbeheer).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should always have a ChartCard element', () => {
        expect(wrapper.find(ChartCard).length).toEqual(1);
    });
    it('should not have any Grid components if there is no data', () => {
        expect(wrapper.find(Grid).length).toEqual(0);
    });
    it('should not have more than 0 Grid component if there is data', () => {
        const days = [
            {id: 0, timestamp: 0, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]},
            {id: 1, timestamp: 0, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]},
            {id: 2, timestamp: 0, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]},
            {id: 3, timestamp: 0, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]},
            {id: 4, timestamp: 0, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]},
            {id: 5, timestamp: 0, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]},
            {id: 6, timestamp: 0, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]}
        ];
        const withDataProps = {
            ...props,
            dataset: {
                [DataSet.AVERAGE_TEMPERATURE]: {
                    id: 0,
                    data_type: '',
                    title: '',
                    weeks: [{ days }]
                } as IApiGraph
            }
        };
        const withDataWrapper = shallow(<ChartForKlimaatbeheer {...withDataProps} />);
        expect(withDataWrapper.find(Grid).length).toBeGreaterThan(0);
    });
});
