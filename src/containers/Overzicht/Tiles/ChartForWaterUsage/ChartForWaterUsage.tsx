import * as React from 'react';
import ChartCard from '../../../../components/ChartCard/ChartCard'
import {connect} from 'react-redux';
import {Grid, Theme, Typography} from '@material-ui/core';
import {getValuesForChart, getCurrentValue} from '../../../../utils/dashboard/chart';
import {beautifyDate} from '../../../../utils/date/date';
import {TimeSpan} from '../../../../utils/date/dateTypes';
import {IApiGraph} from '../../../../utils/data/dataTypes';
import configureChart from './ChartForWaterUsage.config';
import {DataSet} from '../../../../utils/data/apiGraph';
import {IPopup} from '../../../../utils/popup/popup';

export interface IChartForWaterUsageProps {
    theme: Theme
    fetchApiGraphData: (centerDate: Date, typeOfData?: DataSet[]) => void
    openPopup: (popup: IPopup) => void
    selected: {
        timeSpan: TimeSpan
        graphStartDateTime: Date
        currentHourDateTime: Date
    }
    loading: {
        initial: boolean
        partial: boolean
    }
    error: boolean
    dataset: {
        [index in DataSet]?: IApiGraph
    }
}

export class ChartForWaterUsage extends React.Component<IChartForWaterUsageProps, {}> {
    public render() {
        const { props, props: { selected: { timeSpan, graphStartDateTime }, loading, error, dataset } } = this;

        const title = 'Water verbruik';

        const chart = configureChart(props);

        let content = null;
        let noDataForTimeSpanMessage = null as string;

        if (dataset[DataSet.AVERAGE_WATER_USAGE]) {
            const currentAverageWaterUsage = getCurrentValue(dataset[DataSet.AVERAGE_WATER_USAGE]);

            const averageWaterUsageData = getValuesForChart(timeSpan, graphStartDateTime, dataset[DataSet.AVERAGE_WATER_USAGE]);

            const allValues = [
                ...averageWaterUsageData
            ];

            if (!allValues.filter(v => v !== null).length) {
                noDataForTimeSpanMessage = `
                    Zo te zien is er geen ${title.toLowerCase()} data
                    voor de geselecteerde periode (${beautifyDate(graphStartDateTime, '{DATE}')})
                `;
            }

            content = (
                <Grid container direction='row' justify='space-between' alignItems='stretch'>
                    <Grid item>
                        <Typography variant='overline' className='smallerText'>
                            Waterverbruik dit uur:
                        </Typography>
                        <Typography variant='subtitle1'>
                            {currentAverageWaterUsage} Liter
                        </Typography>
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

export default connect(mapStateToProps)(ChartForWaterUsage);
