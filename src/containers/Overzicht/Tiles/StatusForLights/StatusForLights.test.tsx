import * as React from 'react';
import {shallow} from 'enzyme';
import {StatusForLights} from './StatusForLights';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {lightTheme} from '../../../../store/reducers/theme/functions';
import {IApiItem, IApiItemGroup, IApiItemUsage} from '../../../../utils/data/dataTypes';
import {IStatusItemsProps} from '../../../../utils/dashboard/items';
import {Grid} from '@material-ui/core';

describe('<StatusForLights /> (component)', () => {
    let wrapper: any;

    const props: IStatusItemsProps = {
        theme: lightTheme,
        fetchApiItemsData: () => { return },
        openPopup: () => { return },
        items: null as IApiItem[],
        loading: true
    };
    beforeEach(() => wrapper = shallow(<StatusForLights {...props} />));
    it('should be defined', () => {
        expect(StatusForLights).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should always have an InformationCard element', () => {
        expect(wrapper.find(InformationCard).length).toEqual(1);
    });
    it('should not have any Grid components if there is no data', () => {
        expect(wrapper.find(Grid).length).toEqual(0);
    });
    it('should not have more than 0 Grid component if there is data', () => {
        const item: IApiItem = {
            id: 0,
            name: '',
            address: '',
            comment: '',
            last_use: {
                last_used: 0,
                last_use: {
                    datatype: '',
                    data: {}
                }
            },
            usages: [] as IApiItemUsage[],
            groups: [] as IApiItemGroup[]
        };
        const items: IApiItem[] = [ item, item, item ];
        const withDataProps = {
            ...props,
            items,
            loading: false
        };
        const withDataWrapper = shallow(<StatusForLights {...withDataProps} />);
        expect(withDataWrapper.find(Grid).length).toBeGreaterThan(0);
    });
});
