import * as React from 'react';
import {Typography} from '@material-ui/core';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';
import {IPopupDataDatapoint} from '../../../../utils/popup/popup';

const graphDatapointPopup = (props: IPassedPopupContentProps & IReduxPopupContentProps) => {
    const { popup } = props;
    const datapoint: IPopupDataDatapoint = popup.data as IPopupDataDatapoint;
    return (
        <div className='popupContent datapoint'>
            <Typography variant='overline'>
                {datapoint.dateString ? datapoint.dateString : null}
            </Typography>
            <Typography variant='h3'>
                {datapoint.value ? datapoint.value : null}
            </Typography>
        </div>
    );
};

export default graphDatapointPopup;
