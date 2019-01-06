import * as React from 'react';
import {Grid, Icon, Theme, Typography} from '@material-ui/core';
import {IApiItem} from '../data/dataTypes';
import {IPopup} from '../popup/popup';

export interface IStatusItemsProps {
    theme: Theme
    fetchApiData: () => void
    openPopup: (popup: IPopup) => void
    items: IApiItem[],
    loading: boolean
}

export enum ItemTileType {
    LIGHTS = 'LIGHTS',
    OTHER = 'OTHER'
}

export const createContentForItemsTile = (
    type: ItemTileType,
    usage: number,
    on: IApiItem[],
    off: IApiItem[],
    itemsToShow: IApiItem[] = []
) => {
    on = on.filter(item => itemsToShow.map(i => i.id).indexOf(item.id) !== -1);

    let icon = 'device_unknown';
    if (type === ItemTileType.LIGHTS) {
        icon = 'wb_incandescent'
    }
    if (type === ItemTileType.OTHER) {
        icon = 'settings_input_composite'
    }
    const amountOnJSX = (
        <Typography variant='subtitle1' color='secondary'>
            {on.length} staan aan
        </Typography>
    );

    const itemsToShowJSX = itemsToShow.map(item => (
        <Typography key={item.id} variant='subtitle1' color='secondary'>
            {item.name} staat aan
        </Typography>
    ));

    return (
        <Grid container direction='column' justify='space-between' alignItems='stretch' className={'textCenter'}>
            <Grid item>
                <Typography variant='overline' className='tinyText'>
                    verbruik: {usage} Kwh
                </Typography>
            </Grid>
            <Grid item>
                <Icon style={{ fontSize: 120 }} color='secondary'>{ icon }</Icon>
            </Grid>
            <Grid item>
                {itemsToShow.length ? itemsToShowJSX : amountOnJSX}
            </Grid>
            <Grid item>
                <hr />
            </Grid>
            <Grid item>
                <Typography variant='subtitle1'>
                    {off.length} staan uit
                </Typography>
            </Grid>
        </Grid>
    );
};
