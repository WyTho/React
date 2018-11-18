import {
    createAnnotationsForTimeSpan,
    createGradientForChart,
    getLabelsForChart,
    getValuesForChart, getYAxisHeight
} from '../../../../utils/dashboard/chart';
import {beautifyDate} from '../../../../utils/date/date';
import {IAnnotation, IChartData, IChartOptions} from '../../../../utils/dashboard/chartTypes';
import {IChartForKlimaatBeheerProps} from './ChartForKlimaatbeheer';
import {ChartData} from 'react-chartjs-2';
import {createChartOptions, chartOptionsPresets} from '../../../../utils/dashboard/chartOptionsPresets';
import {DataSet} from '../../../../utils/data/apiGraph';
import {PopupType} from '../../../../utils/popup/popup';

const configureChart = (props: IChartForKlimaatBeheerProps) => {
    const  { theme, selected: { timeSpan, graphStartDateTime, currentHourDateTime }, openPopup, dataset } = props;

    const chartColors = {
        light: theme.palette.type === 'light' ? theme.palette.primary.light : theme.palette.secondary.light,
        main:  theme.palette.type === 'light' ? theme.palette.primary.main  : theme.palette.secondary.main,
        dark:  theme.palette.type === 'light' ? theme.palette.primary.dark  : theme.palette.secondary.dark
    };

    const chartTitle = 'Gemiddelde temperatuur';
    const valueReFormatter = (value: string | number) => value + ' °C';

    let data: ChartData<any> = null;
    let options: IChartOptions = null;

    if (dataset[DataSet.AVERAGE_TEMPERATURE]) {
        const labels = getLabelsForChart(timeSpan, graphStartDateTime);

        const averageTemperatureData = getValuesForChart(timeSpan, graphStartDateTime, dataset[DataSet.AVERAGE_TEMPERATURE]);

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
                                openPopup(
                                    PopupType.DATAPOINT,
                                    chartTitle,
                                    {
                                        dateString: beautifyDate(
                                            new Date(labels[context.dataIndex]),
                                            `De ${chartTitle.toLowerCase()} op {WEEK_DAY} {DAY} {MONTH} {YEAR} om {TIME} is`
                                        ),
                                        value: valueReFormatter(context.dataset.data[context.dataIndex])
                                    }
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
