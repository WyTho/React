import {createChartOptions} from '../../../utils/chart';
import {Theme} from '@material-ui/core';
import {beautifyDate} from '../../../utils/date';
import {IAnnotation} from '../../../utils/chartTypes';

export const buildChartOptions = (allValues: any, annotations: IAnnotation[], theme: Theme) => {
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
            align: (context: any) => {
                return context.dataset.data[context.dataIndex] === lowestValue ? 'end' : 'center'
            }
        }
    });
};
