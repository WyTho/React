import * as React from 'react';
import ChartCard from '../../../../components/ChartCard/ChartCard'
import {connect} from 'react-redux';
import {Grid, Theme, Typography} from '@material-ui/core';
import {getValuesForChart, getCurrentValue} from '../../../../utils/dashboard/chart';
import {beautifyDate} from '../../../../utils/date/date';
import {TimeSpan} from '../../../../utils/date/dateTypes';
import {IApiGraph} from '../../../../utils/data/dataTypes';
import configureChart from './ChartForKlimaatbeheer.config';
import {DataSet} from '../../../../utils/data/apiGraph';
import {IPopup} from '../../../../utils/popup/popup';

export interface IChartForKlimaatBeheerProps {
    theme: Theme
    fetchApiGraphData: (centerDate: Date, typeOfData?: DataSet[]) => void
    openPopup: (popup: IPopup) => void
    selected: {
        timeSpan: TimeSpan
        graphStartDateTime: Date
        currentHourDateTime: Date
    },
    loading: {
        initial: boolean
        partial: boolean
    }
    error: boolean
    dataset: {
        [index in DataSet]?: IApiGraph
    }
}

export class ChartForKlimaatbeheer extends React.Component<IChartForKlimaatBeheerProps, {}> {
    public render() {
        const { props, props: { theme, selected: { timeSpan, graphStartDateTime }, loading, error, dataset } } = this;

        const title = 'Klimaatbeheer';

        const chart = configureChart(props);

        let content = null;
        let noDataForTimeSpanMessage = null as string;

        if (dataset[DataSet.AVERAGE_TEMPERATURE]) {
            const currentAverageTemperature = getCurrentValue(dataset[DataSet.AVERAGE_TEMPERATURE]);

            const averageTemperatureData = getValuesForChart(timeSpan, graphStartDateTime, dataset[DataSet.AVERAGE_TEMPERATURE]);

            const allValues = [
                ...averageTemperatureData
            ];

            if (!allValues.filter(v => v !== null).length) {
                noDataForTimeSpanMessage = `
                    Zo te zien is er geen ${title.toLowerCase()} data
                    voor de geselecteerde periode (${beautifyDate(graphStartDateTime, '{DATE}')})
                `;
            }

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
                            ? °C
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
            <ChartCard title={title}
                       loading={loading.initial}
                       errorMessage={error ? `Het laden van ${title.toLowerCase()} is mislukt!` : null}
                       noDataMessage={noDataForTimeSpanMessage}
                       chartData={chart.data || {}}
                       chartOptions={chart.options || {}}
                       onFetchData={() => props.fetchApiGraphData(graphStartDateTime)}>
                {content}
            </ChartCard>
        );

    }
}
const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    const { selected, loading, error, dataset } = state.data;

    return { theme, selected, loading, error: error.status, dataset }
};

export default connect(mapStateToProps)(ChartForKlimaatbeheer);
