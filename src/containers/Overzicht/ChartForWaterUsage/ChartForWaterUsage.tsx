import * as React from 'react';
import ChartCard from '../../../components/ChartCard/ChartCard'
import {connect} from 'react-redux';
import {Button, Grid, Theme, Typography} from '@material-ui/core';
import {getValuesForChart, getCurrentValue} from '../../../utils/chart/chart';
import {beautifyDate} from '../../../utils/date/date';
import {TimeSpan} from '../../../utils/date/dateTypes';
import {IData} from '../../../utils/chart/chartTypes';
import configureChart from './ChartForWaterUsage.config';
import {DataSet} from '../../../utils/data/data';

export interface IChartForWaterUsageProps {
    theme: Theme
    fetchData: (typeOfData: DataSet[], centerDate: Date, initialLoad: boolean) => void
    selected: {
        timeSpan: TimeSpan
        graphStartDateTime: Date
        currentHourDateTime: Date
    }
    loading: {
        initial: boolean
        partial: boolean
    }
    error: {
        status: boolean
        error: Error
        message: string
    }
    dataset: {
        [index in DataSet]: IData
    }
}

class ChartForWaterUsage extends React.Component<IChartForWaterUsageProps, {}> {
    public render() {
        const { props, props: { theme, selected: { timeSpan, graphStartDateTime }, loading, error, dataset } } = this;

        const chart = configureChart(props);

        let content = null;
        let noDataForTimeSpanMessage = null as string;

        if (dataset[DataSet.AVERAGE_TEMPERATURE]) {
            const currentAverageWaterUsage = getCurrentValue(dataset[DataSet.AVERAGE_WATER_USAGE]);

            const averageTemperatureData = getValuesForChart(timeSpan, graphStartDateTime, dataset[DataSet.AVERAGE_TEMPERATURE]);

            const allValues = [
                ...averageTemperatureData
            ];

            if (!allValues.length) {
                noDataForTimeSpanMessage = 'Er is geen temperatuurs data van ' + beautifyDate(graphStartDateTime, '{DATE}');
            }

            content = (
                <Grid container direction='row' justify='space-between' alignItems='stretch'>
                    <Grid item>
                        <Typography variant='overline' className='smallerText'>
                            Huidig verbruik
                        </Typography>
                        <Typography variant='subtitle1'>
                            {currentAverageWaterUsage}
                        </Typography>
                    </Grid>
                </Grid>
            )
        }

        return (
            <ChartCard title={'Water verbruik'}
                       loading={loading.initial}
                       error={error}
                       noDataForTimeSpanMessage={noDataForTimeSpanMessage}
                       chartData={chart.data || {}}
                       chartOptions={chart.options || {}}
                       onFetchData={() => props.fetchData([DataSet.AVERAGE_TEMPERATURE], graphStartDateTime, true)}>
                {content}
            </ChartCard>
        );

    }
}
const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    const { selected, loading, error, dataset } = state.data;

    return { theme, selected, loading, error, dataset }
};

export default connect(mapStateToProps)(ChartForWaterUsage);
