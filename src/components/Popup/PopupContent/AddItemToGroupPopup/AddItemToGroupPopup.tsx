import * as React from 'react';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';
import {IApiItem} from '../../../../utils/data/dataTypes';
import Loading from '../../../../components/Loading/Loading'

const addItemToGroupPopup = (props: IPassedPopupContentProps & IReduxPopupContentProps) => {
    const { popup, groups } = props;
    const item: IApiItem = popup.data as IApiItem;



    console.log(popup);
    console.log(groups);



    let content = <div className='absoluteFlexContainer'><Loading /></div>;
    if (item) {
        content = (
            <div className='popupContent addItemToGroup'>
                addItemToGroupPopup {item.name} {item.id}
            </div>
        );
    }
    return content
};

export default addItemToGroupPopup;
