import * as React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loading from '../../components/Loading/Loading'

interface IProps {
    children: any
    title: string
    elevation?: number
    loading: boolean
    chartData: ChartData
    chartOptions: ChartOptions
    errorMessage?: string
    noDataMessage?: string
    onFetchData: () => void
}
const defaults = {
    elevation: 1,
    shouldRedraw: false
};

const chartCard = (props: IProps) => {
    const {
        children,
        title,
        elevation,
        loading,
        chartData,
        chartOptions,
        errorMessage,
        noDataMessage
    } = props;

    let content = (
        <div className='absoluteFlexContainer'>
            <Loading size={120} />
        </div>
    );
    if (!loading) {
        content = (
            <>
                <div className={'content'}>
                    { children }
                </div>
                <div className={'chartContainer'}>
                    <Line data={chartData} options={chartOptions}/>
                </div>
            </>
        );
    }
    if (noDataMessage) {
        content = (
            <div className='absoluteFlexContainer'>
                <Typography variant='overline'>
                    { noDataMessage }
                </Typography>
            </div>
        );
    }
    if (errorMessage) {
        content = (
            <div className='absoluteFlexContainer'>
                <Typography variant='overline'>
                    { errorMessage }
                </Typography>
                <Button color='primary' onClick={props.onFetchData}>
                    Probeer het opnieuw
                </Button>
            </div>
        );
    }

    return (
        <Paper className='card DashboardCard ChartCard' elevation={typeof elevation !== 'undefined' ? elevation : defaults.elevation}>
            <div className={'titleContainer'}>
                <Typography variant='h6'>
                    { title }
                </Typography>
            </div>
            { content }
        </Paper>
    )
};

export default chartCard;
