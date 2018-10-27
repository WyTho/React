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

const buildChartOptions = (allValues: any, annotations: IAnnotation[], theme: Theme) => {
    const highestValue = allValues.reduce((higest: number, x: number) => x > higest ? x : higest, 0);
    const lowestValue = allValues.reduce((lowest: number, x: number) => x < lowest ? x : lowest, highestValue);
    const spacingValue = ((highestValue - lowestValue) / 2) + 3;

    return createChartOptions({
        beginAtZero: true,
        display: {
            // legend: true
        },
        reformat: {
            tooltipTitle: (tooltipItems: any[], dataAndLabels: any) => {
                const date = dataAndLabels.labels[tooltipItems[0].index];
                return beautifyDate(date, '{WEEK_DAY}, {DATE} om {TIME}');
            },
            tooltipContent: (tooltipItem: any, dataAndLabels: any) =>
                dataAndLabels.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel + ' °C',
            datalabel: (value: number, context: any) => value + ' °C',
        },
        annotations: [...annotations],
        spacingBetweenAnnotationsAndData: highestValue + spacingValue,
        tooltips: {
            caretPadding: 32,
            backgroundColor: theme.palette.primary.dark,
            borderColor: theme.palette.primary.light
        },
        datalabels: {
            align: 'center'
            // align: (context: any) => {
            //     return context.dataset.data[context.dataIndex] === lowestValue ? 'end' : 'center'
            // }
        }
    });
};

interface IChart {
    data: ChartData<any>
    options: ChartOptions
}

const configureChart = (props: IChartForKlimaatBeheerProps) => {
    const  { theme, selected, average_temperature } = props;

    const chart: IChart = {
        data: null,
        options: null
    };

    if (average_temperature.data) {
        const labels = getLabelsForChart(selected.timeSpan, selected.graphStartDateTime);

        const averageTemperatureData = getValuesForChart(selected.timeSpan, selected.graphStartDateTime, average_temperature.data);

        const allValues = [...averageTemperatureData];

        // build chart datasets (configure the lines that should be shown in this graph)
        chart.data = (canvas: any): ChartData<any> => ({
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
        const annotations: IAnnotation[] = createAnnotationsForTimeSpan(
            selected.timeSpan,
            labels,
            selected.currentHourDateTime,
            theme
        );

        // build the chart configuration (options)
        chart.options = buildChartOptions(
            allValues,
            annotations,
            theme
        );
    }

    return chart
};

export default configureChart;
