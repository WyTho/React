import * as React from 'react';
import {shallow} from 'enzyme';
import {PopupContent} from './PopupContent';
import ItemListPopup from './ItemListPopup/ItemListPopup';
import ItemPopup from './ItemPopup/ItemPopup';
import GraphDatapointPopup from './GraphDatapointPopup/GraphDatapointPopup';
import {IPopup, PopupType} from '../../../utils/popup/popup';
import {lightTheme} from '../../../store/reducers/theme/functions';
import {IApiItem, IApiItemGroup, IApiItemUsage} from '../../../utils/data/dataTypes';

describe('<PopupContent /> (component)', () => {
    let wrapper: any;

    const children = (<>
        <h4>Hello</h4>
        <h4>World</h4>
    </>);
    const props = {
        popup: {
            type: PopupType.DATAPOINT,
            title: 'Hello World',
            data: {
                dateString: 'January 1st',
                value: 'Test'
            }
        } as IPopup,
        theme: lightTheme,
        pushPopup: () => { return }
    };
    beforeEach(() => wrapper = shallow(<PopupContent {...props} >{children}</PopupContent>));

    it('should be defined', () => {
        expect(PopupContent).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a GraphDatapointPopup element when the type is ITEM_LIST', () => {
        const itemListProps = {
            ...props,
            popup: {
                ...props.popup,
                type: PopupType.ITEM_LIST,
                data: {
                    on: [] as IApiItem[],
                    off: [] as IApiItem[]
                }
            }
        };
        const itemListWrapper = shallow(<PopupContent {...itemListProps} >{children}</PopupContent>);
        expect(itemListWrapper.find(ItemListPopup).length).toEqual(1);
    });
    it('should have a GraphDatapointPopup element when the type is ITEM', () => {
        const itemProps = {
            ...props,
            popup: {
                ...props.popup,
                type: PopupType.ITEM,
                data: {
                    id: 0,
                    name: '',
                    comment: '',
                    last_use: {
                        last_use_timestamp: 0,
                        datatype: '',
                        data: {}
                    },
                    usages: [] as IApiItemUsage[],
                    groups: [] as IApiItemGroup[]
                } as IApiItem
            }
        };
        const itemWrapper = shallow(<PopupContent {...itemProps} >{children}</PopupContent>);
        expect(itemWrapper.find(ItemPopup).length).toEqual(1);
    });
    it('should have a GraphDatapointPopup element when the type is DATAPOINT', () => {
        expect(wrapper.find(GraphDatapointPopup).length).toEqual(1);
    });
});
