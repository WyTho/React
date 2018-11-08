import {
    createAnnotationsForTimeSpan,
    createGradientForChart,
    getLabelsForChart,
    getValuesForChart
} from '../../../utils/chart/chart';
import {beautifyDate} from '../../../utils/date/date';
import {IAnnotation, IChartData, IChartOptions} from '../../../utils/chart/chartTypes';
import {IChartForWaterUsageProps} from './ChartForWaterUsage';
import {ChartData} from 'react-chartjs-2';
import {createChartOptions, chartOptionsPresets} from '../../../utils/chart/chartOptionsPresets';
import {DataSet} from '../../../utils/data/data';

const configureChart = (props: IChartForWaterUsageProps) => {
    const  { theme, selected: { timeSpan, graphStartDateTime, currentHourDateTime }, dataset } = props;

    let data: ChartData<any> = null;
    let options: IChartOptions = null;

    if (dataset[DataSet.AVERAGE_TEMPERATURE]) {
        const labels = getLabelsForChart(timeSpan, graphStartDateTime);

        const averageTemperatureData = getValuesForChart(timeSpan, graphStartDateTime, dataset[DataSet.AVERAGE_WATER_USAGE]);

        // build chart datasets (configure the lines that should be shown in this graph)
        data = (canvas: HTMLElement): IChartData => ({
            labels,
            datasets: [
                {
                    label: 'Gemiddelde temperatuur',
                    data: averageTemperatureData,
                    borderColor: '#4C4CFF',
                    fill: true,
                    backgroundColor: createGradientForChart(canvas, '#4C4CFF'),
                    datalabels: {
                        backgroundColor: '#4C4CFF',
                        listeners: {
                            click: (context: any) => {
                                console.log(
                                    'label ', context.dataIndex, ' has been clicked!', context.dataset.data[context.dataIndex]
                                );
                            }
                        }
                    }
                }
            ]
        });

        // build the annotations above the chart
        const allValues = [
            ...averageTemperatureData
        ];
        const getYAxisHeight = () => {
            const highestValue = allValues.reduce((higest: number, x: number) => x > higest ? x : higest, 0);
            const lowestValue = allValues.reduce((lowest: number, x: number) => x < lowest ? x : lowest, highestValue);
            return Math.floor(highestValue + ((highestValue - lowestValue) / 2) + 3);
        };

        const annotations: IAnnotation[] = createAnnotationsForTimeSpan(timeSpan, labels, currentHourDateTime, theme, getYAxisHeight());

        // build the chart configuration (options)
        options = createChartOptions(

            // add datalabels to the chart
            chartOptionsPresets.datalabels(),

            // add annotations above the chart (now-label, time-labels & weekday labels)
            chartOptionsPresets.annotations(annotations),

            // overwrite some settings for this chart
            {
                tooltips: {
                    backgroundColor: theme.palette.primary.dark,
                    borderColor: theme.palette.primary.light,
                    callbacks: {
                        title: (tooltipItems: any[], dataAndLabels: any) => {
                            const date = dataAndLabels.labels[tooltipItems[0].index];
                            return beautifyDate(date, '{WEEK_DAY}, {DATE} om {TIME}');
                        },
                        label: (tooltipItem: any, dataAndLabels: any) =>
                            dataAndLabels.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel + ' L'
                    }
                },
                plugins: {
                    datalabels: {
                        formatter: (value: number) => value + ' L',
                    }
                }
            }
        );
    }

    return { data, options }
};

export default configureChart;
