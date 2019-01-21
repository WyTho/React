import {Grid, Icon, IconButton, Tooltip, Typography} from '@material-ui/core';
import * as React from 'react';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';
import {beautifyDate} from '../../../../utils/date/date';
import {IApiItem} from '../../../../utils/data/dataTypes';
import {getIconNameForGroups, PopupType} from '../../../../utils/popup/popup';
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
    const { popup, items } = props;

    // get a live copy from redux
    const item: IApiItem = !items ? null : items.find((i: IApiItem) => i.id === (popup.data as IApiItem).id);

    const addItemToGroupClickHandler = () => props.pushPopup({
        ...popup,
        title: `Groepsbeheer voor '${item.name}'`,
        type: PopupType.MANAGE_ITEM_GROUPS
    });

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

                    <Grid item md={12} sm={12} xs={12}>
                        {!item.usages.length ? null : headerJSX('Verbruik')}
                        {infoJSX(null,
                            item.usages.map(usage => `${usage.consumption_amount} ${usage.consumption_type}`)
                        )}
                    </Grid>

                    <Grid item md={12} sm={12} xs={12}>
                        <div className='headerWrapper'>
                            {headerJSX('Groep(en) waar dit apparaat in zit')}
                            <Tooltip title='Groep toevoegen' aria-label='Groep toevoegen'>
                                <IconButton aria-label='Add' onClick={addItemToGroupClickHandler}>
                                    <Icon>add</Icon>
                                </IconButton>
                            </Tooltip>
                        </div>
                        {item.groups.length ?
                            infoJSX(null, item.groups.map(group => `- ${group.name}`))
                            :
                            <div className='infoSection geen'>
                                <Typography variant='caption'>
                                    Geen
                                </Typography>
                            </div>
                        }
                    </Grid>

                </Grid>

            </div>
        );
    }
    return content
};

export default itemPopup;
