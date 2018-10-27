import {
    createAnnotationsForTimeSpan,
    createChartOptions,
    createGradientForChart,
    getLabelsForChart,
    getValuesForChart
} from '../../../utils/chart';
import {Theme} from '@material-ui/core';
import {beautifyDate} from '../../../utils/date';
import {IAnnotation} from '../../../utils/chartTypes';
import {IChartForKlimaatBeheerProps} from './ChartForKlimaatbeheer';
import {ChartData} from 'react-chartjs-2';
import {ChartOptions} from 'chart.js';

const configureChart = (props: IChartForKlimaatBeheerProps) => {
    const  { theme, selected, average_temperature } = props;

    let data: ChartData<any> = null;
    let options: ChartOptions = null;

    if (average_temperature.data) {
        const labels = getLabelsForChart(selected.timeSpan, selected.graphStartDateTime);

        const averageTemperatureData = getValuesForChart(selected.timeSpan, selected.graphStartDateTime, average_temperature.data);

        // build chart datasets (configure the lines that should be shown in this graph)
        data = (canvas: any): ChartData<any> => ({
            labels,
            datasets: [
                {
                    label: 'Gemiddelde temperatuur',
                    data: averageTemperatureData,
                    borderColor: theme.palette.primary.main,
                    fill: true,
                    backgroundColor: createGradientForChart(canvas, theme.palette.primary.main),
                    datalabels: {
                        backgroundColor: theme.palette.primary.dark,
                        listeners: {
                            click: (context: any) => {
                                console.log(
                                    'label ', context.dataIndex, ' has been clicked!',
                                    context.dataset.data[context.dataIndex]
                                );
                            }
                        }
                    }
                }
            ]
        });

        // build the annotations above the chart
        const allValues = [...averageTemperatureData];
        const highestValue = allValues.reduce((higest: number, x: number) => x > higest ? x : higest, 0);
        const lowestValue = allValues.reduce((lowest: number, x: number) => x < lowest ? x : lowest, highestValue);
        const yAxesHeight = ((highestValue - lowestValue) / 2) + 3;

        const annotations: IAnnotation[] = createAnnotationsForTimeSpan(
            selected.timeSpan,
            labels,
            selected.currentHourDateTime,
            theme,
            yAxesHeight
        );

        // build the chart configuration (options)
        options = buildChartOptions(
            annotations,
            theme
        );
    }

    return { data, options }
};

const buildChartOptions = (annotations: IAnnotation[], theme: Theme) => {
    return createChartOptions({
        tooltips: {
            caretPadding: 32,
            backgroundColor: theme.palette.primary.dark,
            borderColor: theme.palette.primary.light,
            callbacks: {
                title: (tooltipItems: any[], dataAndLabels: any) => {
                    const date = dataAndLabels.labels[tooltipItems[0].index];
                    return beautifyDate(date, '{WEEK_DAY}, {DATE} om {TIME}');
                },
                label: (tooltipItem: any, dataAndLabels: any) =>
                    dataAndLabels.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel + ' °C'
            }
        },

        annotation: {
            annotations: [...annotations],
        },

        plugins: {
            datalabels: {
                formatter: (value: number) => value + ' °C',
            }
        }
    });
};

export default configureChart;
