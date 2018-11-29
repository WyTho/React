import * as React from 'react';
import {shallow} from 'enzyme';
import ItemListPopup from './ItemListPopup';
import {IPopup, PopupType} from '../../../../utils/popup/popup';
import {lightTheme} from '../../../../store/reducers/theme/functions';
import {IApiItem} from '../../../../utils/data/dataTypes';

describe('<ItemListPopup /> (functional component)', () => {
    let wrapper: any;

    const children = (<>
        <h4>Hello</h4>
        <h4>World</h4>
    </>);

    const props = {
        popup: {
            type: PopupType.ITEM_LIST,
            title: 'Hello World',
            data: {
                on: [] as IApiItem[],
                off: [] as IApiItem[]
            }
        } as IPopup,
        theme: lightTheme,
        pushPopup: () => { return }
    };
    beforeEach(() => wrapper = shallow(<ItemListPopup {...props} >{children}</ItemListPopup>));

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
