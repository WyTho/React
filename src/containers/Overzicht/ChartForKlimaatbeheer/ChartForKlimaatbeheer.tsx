import * as React from 'react';
import {ChartData} from 'react-chartjs-2';
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
                    'Er is geen temperatuurs data van ' +
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
                            backgroundColor: theme.palette.primary.dark,
                            listeners: {
                                click: (context: any) => {
                                    // Receives `click` events only for labels of the first dataset.
                                    // The clicked label index is available in `context.dataIndex`.
                                    console.log(
                                        'label ', context.dataIndex, ' has been clicked!',
                                        context.dataset.data[context.dataIndex]
                                    );
                                }
                            }
                        }
                    }
                ]
            };

            chartOptions = {
                // onHover: (context: any) => context.hovered = true,
                maintainAspectRatio: false,
                responsive: true,
                showLines : true,
                layout: {
                    padding: {
                        top: 16
                    }
                },
                scales : {
                    yAxes : [{
                        display: false,
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes : [{
                        display: false,
                        ticks: {
                            autoSkip: true,
                            // maxTicksLimit: 8,
                            callback: (value: Date, index: number, values: any[]) => beautifyDate(value, '{TIME}')
                        },
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
                tooltips: {
                    caretPadding: 32,
                    displayColors: false,
                    backgroundColor: theme.palette.primary.dark,
                    borderColor: theme.palette.primary.light,
                    borderWidth: 1,
                    color: 'white',
                    bodySpacing: 4,
                    callbacks: {
                        title: (tooltipItems: any[], dataAndLabels: any) => {
                            const date = dataAndLabels.labels[tooltipItems[0].index];
                            return beautifyDate(date, '{WEEK_DAY}, {DATE} om {TIME}');
                        },
                        label: (tooltipItem: any, dataAndLabels: any) =>
                            dataAndLabels.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel + ' °C'
                    }
                },
                plugins: {
                    datalabels: {
                        align: (context: any) => {
                            const lowest = context.dataset.data.reduce(
                                (lowestValue: number, value: number) =>
                                    lowestValue === null || value < lowestValue ? value : lowestValue,
                                null
                            );
                            return context.dataset.data[context.dataIndex] === lowest ? 'end' : 'center'
                        },
                        listeners: {
                            enter: (context: any) => {
                                context.hovered = true;
                                return true;
                            },
                            leave: (context: any) => {
                                context.hovered = false;
                                return true;
                            }
                        },
                        borderRadius: 4,
                        color: 'white',
                        formatter: (value: number, context: any) => value + ' °C',
                        opacity:  (context: any) => {
                            if (timeSpan === TimeSpan.week) return 1;
                            if (context.hovered) return 1;
                            if (!(context.dataIndex % 5)) return 1;
                            return 0.001;
                        },
                        display: (context: any) => {
                            // don't show the first label
                            if (context.dataIndex === 0) return false;

                            // don't show the last label
                            if (context.dataIndex === context.dataset.data.length - 1) return false;

                            // // show one out of 3 labels
                            // if (timeSpan === TimeSpan.day) return !(context.dataIndex % 3);
                            // // show all 7 labels
                            // else if (timeSpan === TimeSpan.week) return true;
                            // // show one out of 3 labels
                            // else return !(context.dataIndex % 3)
                        }
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
