import * as React from 'react';
import {Grid, Theme, Typography} from '@material-ui/core';
import {IApiItem} from '../data/dataTypes';
import {IPopup} from '../popup/popup';
import * as devicesImage from '../../assets/images/001-furniture-and-household.svg';
import * as lightsImage from '../../assets/images/002-idea.svg';
import * as heatingImage from '../../assets/images/003-radiator.svg';

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
    let image;
    if (type === ItemTileType.LIGHTS) {
        image = lightsImage;
    }
    if (type === ItemTileType.OTHER) {
        const firstItem = on[0];
        if (firstItem && on[0].name === 'Heating') {
            image = heatingImage;
        } else {
            image = devicesImage;
        }
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
                <img src={image} alt='type of devices' style={{ height: 120 }}/>
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
