import {Grid, Icon, Typography} from '@material-ui/core';
import * as React from 'react';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';
import {beautifyDate} from '../../../../utils/date/date';
import {IApiItem} from '../../../../utils/data/dataTypes';
import {getIconNameForGroups} from '../../../../utils/popup/popup';
import Loading from '../../../../components/Loading/Loading'

const headerJSX = (title: string) => (
    <Typography variant='overline' color='primary'>
        {title}
    </Typography>
);

const infoJSX = (title: string, values: string | string[], shouldHide?: boolean) => {
    if (typeof values === 'string') values = [values];
    values = values.filter(value => value);

    if (shouldHide || !values.length) {
        return null;
    }

    return (
        <div className='infoSection'>
            {!title ? null : <Typography variant='caption' color='secondary'>{title}</Typography>}
            {values.map(value => <Typography key={value} variant='caption'>{value}</Typography>)}
        </div>
    )
};

const itemPopup = (props: IPassedPopupContentProps & IReduxPopupContentProps) => {
    const { popup } = props;
    const item: IApiItem = popup.data as IApiItem;

    let content = <div className='absoluteFlexContainer'><Loading /></div>;
    if (item) {
        content = (
            <div className='popupContent item'>
                <Grid container
                      direction='row'
                      justify='flex-start'
                      alignItems='stretch'>
                    <Grid item>
                        <Icon className='itemIcon' color='primary'>{getIconNameForGroups(item.groups)}</Icon>
                    </Grid>
                    <Grid item>
                        {headerJSX('Informatie')}
                        {infoJSX('apparaatnaam',
                            item.name
                        )}
                        {infoJSX('commentaar',
                            item.comment
                        )}
                        {!item.last_use ? null : infoJSX(
                            `Laatste waarneming (${item.last_use.datatype})`,
                            [
                                item.last_use.data,
                                beautifyDate(new Date(item.last_use.last_use_timestamp * 1000), '(op {DATE} om {TIME})')
                            ],
                            !item.last_use.data
                        )}
                    </Grid>
                </Grid>
                <div className='verticalSpacing' />
                <Grid container
                      direction='row'
                      justify='flex-start'
                      alignItems='stretch'>

                    <Grid item md={6} sm={12} xs={12}>
                        {!item.usages.length ? null : headerJSX('Verbruik')}
                        {infoJSX(null,
                            item.usages.map(usage => `${usage.consumption_amount} ${usage.consumption_type}`)
                        )}
                    </Grid>

                    <Grid item md={6} sm={12} xs={12}>
                        {!item.groups.length ? null : headerJSX('Groep(en) waar dit apparaat in zit')}
                        {infoJSX(null,
                            item.groups.map(group => `- ${group.name}`)
                        )}
                    </Grid>

                </Grid>

            </div>
        );
    }
    return content
};

export default itemPopup;
