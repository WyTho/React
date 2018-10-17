import * as React from 'react';
import {Button, Paper, Typography} from '@material-ui/core';

interface IProps {
    children: any,
    title: string,
    elevation?: number
}
const defaults = {
    elevation: 1
};

const chartCard = (props: IProps) => {
    const { children, title, elevation } = props;
    return (
        <Paper className='card ChartCard' elevation={typeof elevation !== 'undefined' ? elevation : defaults.elevation}>
            <div className={'titleContainer'}>
                <Typography variant='title'>
                    { title }
                </Typography>
                {/*<div className={'buttonContainer'}>
                    <Button className={'timeToggleButton'} variant='outlined' size='small' color='primary'>
                        Maand
                    </Button>
                    <Button className={'timeToggleButton'} variant='outlined' size='small' color='primary'>
                        Week
                    </Button>
                    <Button className={'timeToggleButton'} variant='outlined' size='small' color='primary'>
                        Dag
                    </Button>
                </div>*/}
            </div>
            { children }
        </Paper>
    )
};

export default chartCard;
