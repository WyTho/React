import * as React from 'react';
import {shallow} from 'enzyme';
import GraphDatapointPopup from './GraphDatapointPopup/GraphDatapointPopup';
import GroupPopup from './GroupPopup/GroupPopup';
import ItemListPopup from './ItemListPopup/ItemListPopup';
import ItemPopup from './ItemPopup/ItemPopup';
import ManageGroupsPopup from './ManageGroupsPopup/ManageGroupsPopup';
import ManageItemGroupsPopup from './ManageItemGroupsPopup/ManageItemGroupsPopup';
import {IPopup, PopupType} from '../../../utils/popup/popup';
import {lightTheme} from '../../../store/reducers/theme/functions';
import {IApiGroup, IApiItem, IApiItemGroup, IApiItemUsage} from '../../../utils/data/dataTypes';
import {IPassedPopupContentProps, IReduxPopupContentProps} from "./PopupContent";

describe('PopupContents ( (mostly) functional components)', () => {
    let wrappers: any;

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

    const props: IPassedPopupContentProps & IReduxPopupContentProps = {
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
        items: null as IApiItem[],
        pushPopup: () => { return },
        popPopup: () => { return },
        addItemToGroup: () => { return },
        removeItemFromGroup: () => { return },
        removeGroup: () => { return },
        addGroup: () => { return },
        editGroup: () => { return },
    };

    beforeAll(() => {
        wrappers = {
            GraphDatapointPopup: shallow(<GraphDatapointPopup {...props} >{children}</GraphDatapointPopup>),
            GroupPopup: shallow(<GroupPopup {...props} >{children}</GroupPopup>),
            ItemListPopup: shallow(<ItemListPopup {...props} >{children}</ItemListPopup>),
            ItemPopup: shallow(<ItemPopup {...props} >{children}</ItemPopup>),
            ManageGroupsPopup: shallow(<ManageGroupsPopup {...props} >{children}</ManageGroupsPopup>),
            ManageItemGroupsPopup: shallow(<ManageItemGroupsPopup {...props} >{children}</ManageItemGroupsPopup>)
        }
    });
    describe('<GraphDatapointPopup \> (functional component)', () => {
        it('should be defined', () => {
            expect(GraphDatapointPopup).toBeDefined();
        });
        it('should render', () => {
            expect(wrappers.GraphDatapointPopup).toHaveLength(1);
        });
        it('should have a .popupContent.datapoint div', () => {
            expect(wrappers.GraphDatapointPopup.find('div.popupContent.datapoint').length).toEqual(1);
        });
    });
    describe('<GroupPopup \> (functional component)', () => {
        it('should be defined', () => {
            expect(GroupPopup).toBeDefined();
        });
        it('should render', () => {
            expect(wrappers.GroupPopup).toHaveLength(1);
        });
        it('should have a .popupContent.group div', () => {
            expect(wrappers.GroupPopup.find('div.popupContent.group').length).toEqual(1);
        });
    });
    describe('<ItemListPopup \> (functional component)', () => {
        it('should be defined', () => {
            expect(ItemListPopup).toBeDefined();
        });
        it('should render', () => {
            expect(wrappers.ItemListPopup).toHaveLength(1);
        });
        it('should have a .popupContent.items div', () => {
            expect(wrappers.ItemListPopup.find('div.popupContent.items').length).toEqual(1);
        });
    });
    describe('<ItemPopup \> (functional component)', () => {
        it('should be defined', () => {
            expect(ItemPopup).toBeDefined();
        });
        it('should render', () => {
            expect(wrappers.ItemPopup).toHaveLength(1);
        });
        it('should have a .absoluteFlexContainer div when item is null', () => {
            expect(wrappers.ItemPopup.find('div.absoluteFlexContainer').length).toEqual(1);
            // expect(wrappers.ItemPopup.find('div.popupContent.item').length).toEqual(1);
        });
    });
    describe('<ManageGroupsPopup \> (functional component)', () => {
        it('should be defined', () => {
            expect(ManageGroupsPopup).toBeDefined();
        });
        it('should render', () => {
            expect(wrappers.ManageGroupsPopup).toHaveLength(1);
        });
        it('should have a .absoluteFlexContainer div when groups are null', () => {
            expect(wrappers.ManageGroupsPopup.find('div.absoluteFlexContainer').length).toEqual(1);
            // expect(wrappers.ManageGroupsPopup.find('div.popupContent.manageGroups').length).toEqual(1);
        });
    });
    describe('<ManageItemGroupsPopup \> (functional component)', () => {
        it('should be defined', () => {
            expect(ManageItemGroupsPopup).toBeDefined();
        });
        it('should render', () => {
            expect(wrappers.ManageItemGroupsPopup).toHaveLength(1);
        });
        it('should have a .absoluteFlexContainer div when item is null', () => {
            expect(wrappers.ManageItemGroupsPopup.find('div.absoluteFlexContainer').length).toEqual(1);
            // expect(wrappers.ManageItemGroupsPopup.find('div.popupContent.manageItemGroups').length).toEqual(1);
        });
    });
});
