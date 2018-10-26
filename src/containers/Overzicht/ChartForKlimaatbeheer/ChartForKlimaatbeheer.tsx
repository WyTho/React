import * as React from 'react';
import {ChartData} from 'react-chartjs-2';
import ChartCard from '../../../components/ChartCard/ChartCard'
import {connect} from 'react-redux';
import {Button, Grid, Theme, Typography} from '@material-ui/core';
import * as actions from '../../../store/actions'
import {
    getValuesForChart,
    getLabelsForChart,
    getCurrentValue,
    createAnnotationsForTimeSpan,
} from '../../../utils/chart';
import {beautifyDate} from '../../../utils/date';
import {TimeSpan} from '../../../utils/dateTypes';
import {IAnnotation, ICharDataset} from '../../../utils/chartTypes';
import {buildChartData, buildChartOptions} from './chartData';

interface IProps {
    theme: Theme,
    fetchData: () => void,
    selected: {
        timeSpan: TimeSpan,
        graphStartDateTime: Date,
        currentHourDateTime: Date,
    }
    average_temperature: {
        loading: boolean,
        data: any,
        error: boolean,
    }
}

class ChartForKlimaatbeheer extends React.Component<IProps, {}> {
    public render() {
        const { props, props: { theme, selected, average_temperature } } = this;

        let content = null;
        let chartData: ChartData<any> = null;
        let chartOptions: any = null;
        let noDataForTimeSpanMessage = null as string;

        const loading = average_temperature.loading;
        const error = average_temperature.error;

        if (average_temperature.data) {
            const labels = getLabelsForChart(selected.timeSpan, selected.graphStartDateTime);
            const currentAverageTemperature = getCurrentValue(average_temperature.data);

            const averageTemperatureData =
                getValuesForChart(selected.timeSpan, selected.graphStartDateTime, average_temperature.data);

            const allValues = [...averageTemperatureData];

            if (allValues.length === 0) {
                noDataForTimeSpanMessage =
                    'Er is geen temperatuurs data van ' + beautifyDate(selected.graphStartDateTime, '{DATE}')
            }

            // configure the lines that should be shown in this graph
            const chartDatasets: ICharDataset[] = [
                {
                    label: 'Gemiddelde temperatuur',
                    values: averageTemperatureData,
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary.main,
                    dataLabelBackgroundColor: theme.palette.primary.dark,
                    clickHandler: (context: any) => {
                        console.log(
                            'label ', context.dataIndex, ' has been clicked!',
                            context.dataset.data[context.dataIndex]
                        );
                    }
                }
            ];

            // build chart datasets
            chartData = buildChartData(
                labels,
                chartDatasets
            );

            // build the annotations above the chart
            const annotations: IAnnotation[] = createAnnotationsForTimeSpan(
                selected.timeSpan,
                labels,
                selected.currentHourDateTime,
                theme
            );

            // build the chart configuration (options)
            chartOptions = buildChartOptions(
                allValues,
                annotations,
                theme
            );

            // confige the diffrent UI parts of this graph-card
            const ui = {
                divider: <Grid item className='verticalDivider' style={{ borderColor: theme.palette.divider }} />,
                powerUsage: (
                    <>
                        <Typography variant='overline' className='smallerText'>
                            Stroomverbruik
                        </Typography>

                        <Grid container direction='row' justify='space-between'>

                            <Typography variant='overline' className='tinyText'>
                                Vandaag
                            </Typography>
                            <div className='horizontalSpacing' />
                            <Typography variant='overline'
                                        className='tinyText'
                                        style={{ color: theme.palette.secondary.main }}>
                                99 Kwh
                            </Typography>

                        </Grid>

                        <Grid container direction='row' justify='space-between'>

                            <Typography variant='overline' className='tinyText'>
                                Deze week
                            </Typography>
                            <div className='horizontalSpacing' />
                            <Typography variant='overline'
                                        className='tinyText'
                                        style={{ color: theme.palette.secondary.main }}>
                                999 Kwh
                            </Typography>

                        </Grid>
                    </>
                ),
                planning: (
                    <>
                        <Typography variant='overline' className='smallerText'>
                            Temperatuurs planning
                        </Typography>
                        <Button variant='outlined'
                                color='primary'
                                size='small'
                                style={{ margin: theme.spacing.unit }}>
                            Instellen
                        </Button>
                    </>
                ),
                currentTemperature: (
                    <>
                        <Typography variant='overline' className='smallerText'>
                            Huidige temperatuur
                        </Typography>
                        <Typography variant='h3' style={{ color: theme.palette.secondary.main }}>
                            {currentAverageTemperature} °C
                        </Typography>
                    </>
                ),
                outsideTemperature: (
                    <>
                        <Typography variant='overline' className='smallerText'>
                            Temperatuur buiten
                        </Typography>
                        <Typography variant='subtitle1'>
                            pittig heet °C
                        </Typography>
                    </>
                )
            };

            content = (
                <Grid container direction='row' justify='space-between' alignItems='stretch'>
                    <Grid item>
                        <Grid container direction='row'>
                            <Grid item>
                                <Grid container direction='column'>
                                    {ui.powerUsage}
                                </Grid>
                            </Grid>
                            {ui.divider}
                            <Grid item>
                                <Grid container direction='column' justify='space-between'>
                                    {ui.planning}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction='row'>
                            <Grid item>
                                <Grid container direction='column' justify='space-between'>
                                    {ui.currentTemperature}
                                </Grid>
                            </Grid>
                            {ui.divider}
                            <Grid item>
                                <Grid container direction='column' justify='space-between'>
                                    {ui.outsideTemperature}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )
        }

        return (
            <ChartCard title={'Klimaatbeheer'}
                       loading={loading}
                       error={error}
                       noDataForTimeSpanMessage={noDataForTimeSpanMessage}
                       chartData={chartData}
                       chartOptions={chartOptions}
                       onFetchData={props.fetchData}>
                {content}
            </ChartCard>
        );

    }
}
const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    const { selected, average_temperature } = state.data;
    return { theme, selected, average_temperature }
};

const mapDispatchToProps = (dispatch: any): Partial<IProps> => ({
    fetchData: () => dispatch(actions.fetchTemperature())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartForKlimaatbeheer);
