import * as React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import Loading from '../../components/Loading/Loading'

interface IProps {
    children: any,
    title: string,
    elevation?: number,
    loading: boolean,
    error: boolean,
    onFetchData: () => void
}
const defaults = {
    elevation: 1,
    shouldRedraw: false
};

const informationCard = (props: IProps) => {
    const { children, title, elevation, loading, error } = props;

    let content = (
        <div className='absoluteFlexContainer'>
            <Loading size={120} />
        </div>
    );
    if (!loading) {
        content = (
            <>
                <div className={'content'}>
                    {children}
                </div>
            </>
        );
    }
    if (error) {
        content = (
            <div className='absoluteFlexContainer'>
                <Typography variant='overline'>
                    Het laden van {title} is mislukt!
                </Typography>
                <Button color='primary' onClick={props.onFetchData}>
                    Probeer het opnieuw
                </Button>
            </div>
        );
    }
    return (
        <Paper className='card DashboardCard' elevation={typeof elevation !== 'undefined' ? elevation : defaults.elevation}>
            <div className={'titleContainer'}>
                <Typography variant='h6'>
                    { title }
                </Typography>
            </div>
            { content }
        </Paper>
    )
};

export default informationCard;
