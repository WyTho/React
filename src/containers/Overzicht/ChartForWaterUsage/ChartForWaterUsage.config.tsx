
import {
    createAnnotationsForTimeSpan,
    createGradientForChart,
    getLabelsForChart,
    getValuesForChart, getYAxisHeight
} from '../../../utils/chart/chart';
import {beautifyDate} from '../../../utils/date/date';
import {IAnnotation, IChartData, IChartOptions} from '../../../utils/chart/chartTypes';
import {IChartForWaterUsageProps} from './ChartForWaterUsage';
import {ChartData} from 'react-chartjs-2';
import {createChartOptions, chartOptionsPresets} from '../../../utils/chart/chartOptionsPresets';
import {DataSet} from '../../../utils/data/apiGraph';

const configureChart = (props: IChartForWaterUsageProps) => {
    const  { theme, selected: { timeSpan, graphStartDateTime, currentHourDateTime }, openModal, dataset } = props;

    const chartColors = {
        light: theme.palette.type === 'light' ? '#6c74ff' : theme.palette.primary.light,
        main:  theme.palette.type === 'light' ? '#4C4CFF' : theme.palette.primary.main,
        dark:  theme.palette.type === 'light' ? '#3131a2' : theme.palette.primary.dark
    };

    const chartTitle = 'Gemiddeld water verbruik';
    const valueReFormatter = (value: string | number) => value + ' Liter';

    let data: ChartData<any> = null;
    let options: IChartOptions = null;

    if (dataset[DataSet.AVERAGE_WATER_USAGE]) {
        const labels = getLabelsForChart(timeSpan, graphStartDateTime);

        const averageTemperatureData = getValuesForChart(timeSpan, graphStartDateTime, dataset[DataSet.AVERAGE_WATER_USAGE]);

        // build chart datasets (configure the lines that should be shown in this graph)
        data = (canvas: HTMLElement): IChartData => ({
            labels,
            datasets: [
                {
                    label: chartTitle,
                    data: averageTemperatureData,
                    borderColor: chartColors.main,
                    fill: true,
                    backgroundColor: createGradientForChart(canvas, chartColors.main),
                    datalabels: {
                        backgroundColor: chartColors.dark,
                        listeners: {
                            click: (context: any) => {
                                openModal(
                                    chartTitle,
                                    new Date(labels[context.dataIndex]),
                                    valueReFormatter(context.dataset.data[context.dataIndex])
                                )
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

        const annotations: IAnnotation[] = createAnnotationsForTimeSpan(
            timeSpan,
            labels,
            currentHourDateTime,
            theme,
            getYAxisHeight(allValues)
        );

        // build the chart configuration (options)
        options = createChartOptions(

            // add datalabels to the chart
            chartOptionsPresets.datalabels(),

            // add annotations above the chart (now-label, time-labels & weekday labels)
            chartOptionsPresets.annotations(annotations),

            // overwrite some settings for this chart
            {
                tooltips: {
                    backgroundColor: chartColors.dark,
                    borderColor: chartColors.light,
                    callbacks: {
                        title: (tooltipItems: any[], dataAndLabels: any) => {
                            const date = dataAndLabels.labels[tooltipItems[0].index];
                            return beautifyDate(date, '{WEEK_DAY}, {DATE} om {TIME}');
                        },
                        label: (tooltipItem: any, dataAndLabels: any) =>
                            dataAndLabels.datasets[tooltipItem.datasetIndex].label + ': ' + valueReFormatter(tooltipItem.yLabel)
                    }
                },
                plugins: {
                    datalabels: {
                        formatter: (value: number) => valueReFormatter(value),
                    }
                }
            }
        );
    }

    return { data, options }
};

export default configureChart;
