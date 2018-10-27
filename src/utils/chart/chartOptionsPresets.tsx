import {IAnnotation, IChartOptions} from './chartTypes';
import {mergeDeep} from '../other';

export const createChartOptions = (...partialOptions: IChartOptions[]): IChartOptions => {
    return mergeDeep({}, chartOptionsPresets.defaults(), ...partialOptions)
};

export const chartOptionsPresets = {
    defaults: (): IChartOptions => ({
        maintainAspectRatio: false,
        responsive: true,
        showLines : true,
        legend: {
            display: false
        },
        elements : {
            line : {},
            point : {
                radius: 0,
                hitRadius: 20
            }
        },
        scales: {
            yAxes : [{
                display: false,
                gridLines: {
                    display: false
                },
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes : [{
                display: false,
                gridLines: {
                    display: false
                }
            }]
        },
        tooltips: {
            caretPadding: 0,
            displayColors: false,
            bodySpacing: 4,
            callbacks: {
                title: (tooltipItems: any[], dataAndLabels: any) => dataAndLabels.labels[tooltipItems[0].index],
                label: (value: any) => value
            }
        },
    }),
    datalabels: (): IChartOptions => ({
        tooltips: {
            caretPadding: 32
        },
        plugins: {
            datalabels: {
                display: (context: any) => {
                    // don't show the first label
                    if (context.dataIndex === 0) return false;

                    // don't show the last label
                    if (context.dataIndex === context.dataset.data.length - 1) return false;
                },
                align: 'center',
                formatter: ((value: number) => value),
                borderRadius: 4,
                color: 'white',
                opacity: (context: any) => {
                    if (context.active) return 1;
                    return 0.001;
                }
            }
        }
    }),
    annotations: (annotations: IAnnotation[]): IChartOptions => ({
        annotation: {
            annotations
        },
    })
};
