import * as React from 'react';
import {shallow} from 'enzyme';
import ItemPopup from './ItemPopup';
import {IPopup, PopupType} from '../../../../utils/popup/popup';
import {lightTheme} from '../../../../store/reducers/theme/functions';
import Loading from '../../../Loading/Loading';
import {IApiItem, IApiItemGroup, IApiItemUsage} from '../../../../utils/data/dataTypes';

describe('<ItemPopup /> (functional component)', () => {
    let wrapper: any;

    const children = (<>
        <h4>Hello</h4>
        <h4>World</h4>
    </>);

    const props = {
        popup: {
            type: PopupType.ITEM,
            title: 'Hello World',
            data: {
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
            }
        } as IPopup,
        theme: lightTheme,
        pushPopup: () => { return }
    };
    beforeEach(() => wrapper = shallow(<ItemPopup {...props} >{children}</ItemPopup>));

    it('should be defined', () => {
        expect(ItemPopup).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a Loading element inside of an absoluteFlexContainer if the data is null', () => {
        const loadingProps = {
            ...props,
            popup: {
                ...props.popup,
                type: PopupType.ITEM,
                data: null as IApiItem
            }
        };
        const loadingWrapper =  shallow(<ItemPopup {...loadingProps} >{children}</ItemPopup>);
        expect(loadingWrapper.find('div.absoluteFlexContainer').length).toEqual(1);
        expect(loadingWrapper.find(Loading).length).toEqual(1);
    });
    it('should have a .popupContent.item div if the data is not null', () => {
        expect(wrapper.find('div.popupContent.item').length).toEqual(1);
    });
});