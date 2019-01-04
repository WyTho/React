import * as React from 'react';
import {shallow} from 'enzyme';
import ItemListPopup from './ItemListPopup';
import {IPopup, PopupType} from '../../../../utils/popup/popup';
import {lightTheme} from '../../../../store/reducers/theme/functions';
import {IApiGroup, IApiItem, IApiItemGroup, IApiItemUsage} from '../../../../utils/data/dataTypes';

describe('<ItemListPopup /> (functional component)', () => {
    let wrapper: any;

    const children = (<>
        <h4>Hello</h4>
        <h4>World</h4>
    </>);

    const mockItemGroup: IApiItemGroup = {
        id: 0,
        name: ''
    };
    const mockItemUsage: IApiItemUsage = {
        id: 0,
        item_id: 0,
        consumption_type: 'KILOWATT',
        consumption_amount: 1,
        address: '',
        unit: '',
        min_value: 0,
        max_value: 0
    };
    const mockItem: IApiItem = {
        id: 0,
        name: '',
        comment: '',
        last_use: {
            last_use_timestamp: (new Date()).getTime(),
            datatype: '',
            data: {}
        },
        usages: [
            mockItemUsage,
            mockItemUsage,
            mockItemUsage
        ] as IApiItemUsage[],
        groups: [
            mockItemGroup,
            mockItemGroup,
            mockItemGroup
        ] as IApiItemGroup[]
    };

    const props = {
        popup: {
            type: PopupType.ITEM_LIST,
            title: 'Hello World',
            data: {
                on: [
                    mockItem,
                    mockItem,
                    mockItem
                ] as IApiItem[],
                off: [
                    mockItem,
                    mockItem,
                    mockItem
                ] as IApiItem[]
            }
        } as IPopup,
        theme: lightTheme,
        groups: null as IApiGroup[],
        pushPopup: () => { return }
    };
    beforeAll(() => wrapper = shallow(<ItemListPopup {...props} >{children}</ItemListPopup>));

    it('should be defined', () => {
        expect(ItemListPopup).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a .popupContent.items div', () => {
        expect(wrapper.find('div.popupContent.items').length).toEqual(1);
    });
});
