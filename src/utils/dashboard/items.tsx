import * as React from 'react';
import {Grid, Icon, Typography} from '@material-ui/core';
import {IApiItem} from '../data/dataTypes';

export const createContentForItemsTile = (usage: number, amountOn: number, amountOff: number, itemsToShow?: IApiItem[]) => {
    const amountOnJSX = (
        <Typography variant='subtitle1' color='secondary'>
            {amountOn} staan aan
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
                <Icon style={{ fontSize: 120 }} color='secondary'>wb_incandescent</Icon>
            </Grid>
            <Grid item>
                {itemsToShow.length ? itemsToShowJSX : amountOnJSX}

            </Grid>
            <Grid item>
                <hr />
            </Grid>
            <Grid item>
                <Typography variant='subtitle1'>
                    {amountOff} staan uit
                </Typography>
            </Grid>
        </Grid>
    );
};
