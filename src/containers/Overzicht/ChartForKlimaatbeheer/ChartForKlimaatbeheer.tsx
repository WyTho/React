import * as React from 'react';
import {ChartData, Line} from 'react-chartjs-2';
import ChartCard from '../../../components/ChartCard/ChartCard'
import {connect} from 'react-redux';
import {Theme} from '@material-ui/core';
import * as actions from '../../../store/actions'
import {getLabelsAndValuesForChart, TimeSpan} from '../../../utils/chartDataUtilities';
import {beautifyDate} from '../../../utils/dateUtilities';

interface IProps {
    theme: Theme,
    fetchData: () => void,
    loading: boolean,
    data: any,
    error: boolean,
    timeSpan: TimeSpan,
    graphStartDateTime: Date,
    currentDateTime: Date
}

class ChartForKlimaatbeheer extends React.Component<IProps, {}> {
    public render() {
        const { props, props: { theme, loading, data, error, timeSpan, graphStartDateTime, currentDateTime } } = this;

        let chartData: ChartData<any> = null;
        let chartOptions: any = null;
        let noDataForTimeSpanMessage = null as string;
        if (data) {

            const dataForChart = getLabelsAndValuesForChart(timeSpan, graphStartDateTime, data);
            if (dataForChart.values.averageTemperature.length === 0) {
                noDataForTimeSpanMessage =
                    'Er is geen data over de gemiddelde temperatuur op ' +
                    beautifyDate(graphStartDateTime, '{DATE}')
            }
            chartData = {
                labels: dataForChart.labels,
                datasets: [
                    {
                        data: dataForChart.values.averageTemperature,
                        label: 'Gemiddelde temperatuur',
                        borderColor: theme.palette.primary.main,
                        fill: true,
                        backgroundColor: theme.palette.primary.light,
                        datalabels: {
                            backgroundColor: theme.palette.primary.dark
                        }
                    }
                ]
            };

            chartOptions = {
                maintainAspectRatio: false,
                responsive: true,
                showLines : true,
                scales : {
                    yAxes : [{
                        display: false,
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes : [{
                        display: false,
                        position: 'top',
                        gridLines: {
                            display: true
                        },
                        scaleLabel: {
                            fontSize: 16,
                            display: true,
                            fontStyle: 'normal'
                        }
                    }]
                },
                legend: {
                    display: false,
                },
                elements : {
                    line : {},
                    point : {
                        radius: 0,
                        hitRadius: 20
                    }
                },
                plugins: {
                    datalabels: {

                        borderRadius: 4,
                        color: 'white',
                        formatter: (value: number, context: any) => Math.round(value) + ' °C'
                    }
                },
            };
        }
        return (
            <ChartCard title={'Klimaatbeheer'}
                       loading={loading}
                       error={error}
                       noDataForTimeSpanMessage={noDataForTimeSpanMessage}
                       chartData={chartData}
                       chartOptions={chartOptions}
                       onFetchData={props.fetchData}>
                hello, world!
            </ChartCard>
        );

    }
}
const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    const {
        selected: { timeSpan, graphStartDateTime, currentDateTime },
        temperature: { loading, data, error }
    } = state.data;
    return { theme, loading, data, error, timeSpan, graphStartDateTime, currentDateTime }
};

const mapDispatchToProps = (dispatch: any): Partial<IProps> => ({
    fetchData: () => dispatch(actions.fetchTemperature())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartForKlimaatbeheer);
