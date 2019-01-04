import * as React from 'react';
import {shallow} from 'enzyme';
import GraphDatapointPopup from './GraphDatapointPopup';
import {IPopup, PopupType} from '../../../../utils/popup/popup';
import {lightTheme} from '../../../../store/reducers/theme/functions';
import {IApiGroup} from '../../../../utils/data/dataTypes';

describe('<GraphDatapointPopup /> (functional component)', () => {
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
        groups: null as IApiGroup[],
        pushPopup: () => { return }
    };
    beforeEach(() => wrapper = shallow(<GraphDatapointPopup {...props} >{children}</GraphDatapointPopup>));

    it('should be defined', () => {
        expect(GraphDatapointPopup).toBeDefined();
    });
    it('should render', () => {
        expect(wrapper).toHaveLength(1);
    });
    it('should have a .popupContent.datapoint div', () => {
        expect(wrapper.find('div.popupContent.datapoint').length).toEqual(1);
    });
});
