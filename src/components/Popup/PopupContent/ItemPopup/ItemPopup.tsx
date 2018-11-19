import {Typography} from '@material-ui/core';
import * as React from 'react';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';
import {beautifyDate} from '../../../../utils/date/date';
import {IApiItem} from '../../../../utils/data/dataTypes';

const itemPopup = (props: IPassedPopupContentProps & IReduxPopupContentProps) => {
    const { popup, theme } = props;
    const item: IApiItem = popup.data as IApiItem;
    return (
        <div className='popupContent item'>

            <Typography variant='overline' color='primary'>
                information
            </Typography>
            <Typography variant='overline'>
                id: {item.id ? item.id : null}
            </Typography>
            <Typography variant='overline'>
                name: {item.name ? item.name : null}
            </Typography>
            <Typography variant='overline'>
                address: {item.address ? item.address : null}
            </Typography>
            <Typography variant='overline'>
                comment: {item.comment ? item.comment : null}
            </Typography>

            <Typography variant='overline' color='primary'>
                Laatste verbruik ({item.last_use.last_use.datatype ? item.last_use.last_use.datatype : null})
            </Typography>
            <Typography variant='overline'>
                last_use: {item.last_use.last_use.data ? item.last_use.last_use.data : null}
                {item.last_use.last_used ? `(${beautifyDate(new Date(item.last_use.last_used * 1000), '{DATE}')})` : null}
            </Typography>

            <Typography variant='overline' color='primary'>
                usages
            </Typography>
            {item.usages.map(usage => (
                <Typography key={usage.usage_type} variant='overline'>
                    {usage.usage_type ? usage.usage_type : null}: {usage.usage ? usage.usage : null}
                </Typography>
            ))}

            <Typography variant='overline' color='primary'>
                groups
            </Typography>
            {item.groups.map(group => (
                <Typography key={group.name} variant='overline'>
                    {group.name ? group.name : null}
                </Typography>
            ))}
        </div>
    );
};

export default itemPopup;
