import * as React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Loading from '../../components/Loading/Loading'

interface IProps {
    children: any,
    title: string,
    elevation?: number,
    loading: boolean,
    error: boolean,
    noDataForTimeSpanMessage?: string,
    chartData: ChartData,
    chartOptions: ChartOptions,
    onFetchData: () => void
}
const defaults = {
    elevation: 1
};

const chartCard = (props: IProps) => {
    const {
        children,
        title,
        elevation,
        loading,
        error,
        chartData,
        chartOptions,
        noDataForTimeSpanMessage
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
                    <Typography>
                        {children}
                    </Typography>
                </div>
                <div className={'chartContainer'}>
                    <Line data={chartData} options={chartOptions}/>
                </div>
            </>
        );
    }
    if (error) {
        content = (
            <div className='absoluteFlexContainer'>
                <Typography variant='display1'>
                    Het laden van {title} is mislukt!
                </Typography>
                <Button color='primary' onClick={props.onFetchData}>
                    Probeer het opnieuw
                </Button>
            </div>
        );
    }
    if (noDataForTimeSpanMessage) {
        content = (
            <div className='absoluteFlexContainer'>
                <Typography variant='headline'>
                    { noDataForTimeSpanMessage }
                </Typography>
            </div>
        );
    }
    return (
        <Paper className='card ChartCard' elevation={typeof elevation !== 'undefined' ? elevation : defaults.elevation}>
            <div className={'titleContainer'}>
                <Typography variant='title'>
                    { title }
                </Typography>
            </div>
            { content }
        </Paper>
    )
};

export default chartCard;
