import {
    getBeginningOfTheDay,
    getBeginningOfTheHour,
    getBeginningOfTheMonth,
    getBeginningOfTheWeek, getEndOfTheMonth
} from './date';
import {IAnnotation, IChartOptionsConfig, IData, TypeOf} from './chartTypes';
import {TimeSpan} from './dateTypes';
import {hexToRgba} from './utils';
import {Theme} from '@material-ui/core';

export const createGradientForChart = (canvas: any, hexColor: string) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, hexColor);
    gradient.addColorStop(0.3, hexColor);
    gradient.addColorStop(1, hexToRgba(hexColor, 0.3));
    return gradient
};

export const getLabelsForChart = (timeSpan: TimeSpan, startDate: Date) => {
    const labels: any[] = [];

    let amountOfLabels: number = 0;
    let startTime: number;
    let addTime: number;

    if (timeSpan === TimeSpan.day) {
        amountOfLabels = 24;
        startTime = getBeginningOfTheDay(startDate).getTime();
        addTime = 60 * 60 * 1000;
    } else if (timeSpan === TimeSpan.week) {
        amountOfLabels = 7;
        startTime = getBeginningOfTheWeek(startDate).getTime();
        addTime = 24 * 60 * 60 * 1000;
    } else if (timeSpan === TimeSpan.month) {
        amountOfLabels = getEndOfTheMonth(startDate).getDate() + 1;
        startTime = getBeginningOfTheMonth(startDate).getTime();
        addTime = 24 * 60 * 60 * 1000;
    }

    for (let i = 0; i < amountOfLabels; i++) {
        labels.push(new Date(startTime + (i * addTime)));
    }

    return labels
};

export const getValuesForChart = (timeSpan: TimeSpan, startDate: Date, data: IData, typeofValues: TypeOf = TypeOf.NUMBER) => {
    let values: any[] = [];

    let checkIfNeedsToBePushed: (day: any) => boolean;
    let pushValue: (day: any) => void;

    if (timeSpan === TimeSpan.day) {

        checkIfNeedsToBePushed = (day: any) => day.timestamp * 1000 === getBeginningOfTheDay(startDate).getTime();
        pushValue = (day: any) => pushAllHoursOfDay(day)

    } else if (timeSpan === TimeSpan.week) {

        checkIfNeedsToBePushed = (day: any) => {
            const dayDate = new Date(day.timestamp * 1000);
            return getBeginningOfTheWeek(startDate).getTime() === getBeginningOfTheWeek(dayDate).getTime()
        };
        pushValue = (day: any) => pushDay(day)

    } else if (timeSpan === TimeSpan.month) {

        checkIfNeedsToBePushed = (day: any) => {
            const dayDate = new Date(day.timestamp * 1000);
            return getBeginningOfTheMonth(startDate).getTime() === getBeginningOfTheMonth(dayDate).getTime();
        };
        pushValue = (day: any) => pushDay(day)

    }

    for (const week of data.weeks) {
        for (const day of week.days) {
            if (checkIfNeedsToBePushed(day)) {
                pushValue(day)
            }
        }
    }

    // TODO: TEMPORARY
    /*  temp, until backend sends null data instead of 0  */
    values = values.filter(value => value || null);
    /*  /temp  */

    // TODO: TEMPORARY
    /*  temp, until backend sends complete month objects instead of starting in the middle  */
    if (timeSpan === TimeSpan.month) {
        const nr = getEndOfTheMonth(startDate).getDate() - values.length + 1;
        const firstDateInDataset = new Date(data.weeks[0].days[0].timestamp * 1000).getDate();
        if (nr === firstDateInDataset) {
            for (let i = 0; i < nr; i++) values.unshift(0)
        }
    }
    /*  /temp  */

    return values;

    // helper functions
    function pushAllHoursOfDay(day: any) {
        for (const value of day.values) {
            if (typeofValues === TypeOf.NUMBER) {
                values.push( +value.toFixed(1) );
            }
        }
    }
    function pushDay(day: any) {
        if (typeofValues === TypeOf.NUMBER) {
            const total = day.values.reduce((sum: number, value: number) => sum + value, 0);
            values.push(+(total / day.values.length).toFixed(1))
        }
    }
};

export const getCurrentValue = (data: any): number => {
    const now = getBeginningOfTheHour(new Date());

    for (const week of data.weeks) {
        for (const day of week.days) {
            if (day.timestamp * 1000 === getBeginningOfTheDay(now).getTime()) {
                return (day.values[now.getHours()] || 0).toFixed(1);
            }
        }
    }

    return null
};

export const createChartOptions = (config: IChartOptionsConfig) => {
    config = {

        // defaults
        display: {},
        tooltips: {},
        reformat: {},
        datalabels: {
            // displayLabels: DataLabelsDisplay.NONE
        },
        annotations: [],
        spacingBetweenAnnotationsAndData: 0,

        // overwrites
        ...config
    };

    const annotationsArray: any = [];
    if (config.spacingBetweenAnnotationsAndData) {
        config.annotations.push({
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: config.spacingBetweenAnnotationsAndData,

            borderWidth: 0,
            borderColor: 'transparent'
        });
    }

    config.annotations.forEach((annotation: IAnnotation) => {
        let labelProps = {};
        if (annotation.label) {
            labelProps = {
                label: {
                    enabled: true,
                    backgroundColor: annotation.label.backgroundColor || 'grey',
                    position: annotation.label.position || 'top',
                    content: annotation.label.content || '12:00'
                }
            }
        }
        annotationsArray.push({
            type: annotation.type || 'line',
            drawTime: annotation.drawTime || 'beforeDatasetsDraw',
            mode: annotation.mode || 'vertical',
            scaleID: annotation.scaleID || 'x-axis-0',
            value: annotation.value || 'no value defined',
            borderColor: annotation.borderColor || 'grey',
            borderWidth: annotation.borderWidth || 1,
            borderDash: annotation.borderDash || [0, 0],
            ...labelProps
        })
    });

    return {
        maintainAspectRatio: false,
        responsive: true,
        showLines : true,
        legend: {
            display: !!config.display.legend
        },
        elements : {
            line : {},
            point : {
                radius: config.display.points ? 5 : 0,
                hitRadius: 20
            }
        },
        scales: {
            yAxes : [{
                display: !!config.display.scaleX,
                gridLines: {
                    display: !!config.display.gridlinesX
                },
                ticks: {
                    beginAtZero: !!config.beginAtZero
                }
            }],
            xAxes : [{
                display: !!config.display.scaleY,
                gridLines: {
                    display: !!config.display.gridlinesY
                }
            }]
        },
        tooltips: {
            caretPadding: config.tooltips.caretPadding || 0,
            displayColors: !!config.tooltips.displayColors,
            backgroundColor: config.tooltips.backgroundColor || 'orange',
            borderColor: config.tooltips.borderColor || 'blue',
            borderWidth: 1,
            color: config.tooltips.color || 'green',
            bodySpacing: 4,
            callbacks: {
                title: config.reformat.tooltipTitle,
                label: config.reformat.tooltipContent
            }
        },

        annotation: {
            annotations: annotationsArray
        },

        plugins: {
            datalabels: {
                display: (context: any) => {

                    // don't show the first label
                    if (context.dataIndex === 0) return false;

                    // don't show the last label
                    if (context.dataIndex === context.dataset.data.length - 1) return false;
                },
                align: config.datalabels.align || 'center',
                formatter: config.reformat.datalabel || ((value: number) => value),
                borderRadius:
                    typeof config.datalabels.borderRadius === 'undefined' ? 4 : config.datalabels.borderRadius,
                color: config.datalabels.color || 'white',
                opacity: (context: any) => {
                    if (context.active) return 1;
                    return 0.001;
                }
            }
        }
    }
};

export const createAnnotationsForTimeSpan = (timeSpan: TimeSpan, labels: any[], currentHour: Date, theme: Theme): IAnnotation[] => {

    const annotations: IAnnotation[] = [];
    const nowAnnotation = (value: any) => ({
        drawTime: 'afterDatasetsDraw',
        value,
        borderColor: theme.palette.secondary.main,
        borderWidth: 2,
        borderDash: [3, 3],
        label: {
            backgroundColor: theme.palette.secondary.main,
            content: 'Nu'
        }
    });

    const beginningOfTheDayLabel =
        labels.find((label: Date) => label.getTime() === getBeginningOfTheDay(currentHour).getTime());

    if (timeSpan === TimeSpan.day) {
        const timeAnnotation = (hour: number) => ({
            value: labels[hour],
            borderDash: [8, 8],
            borderColor: '#888',
            label: {
                backgroundColor: '#888',
                content: hour + ':00'
            }
        });

        let timesToAnnotate = [6, 12, 18];
        timesToAnnotate = timesToAnnotate.filter((x: number) => currentHour.getHours() !== x);
        timesToAnnotate.forEach((x: number) => annotations.push(timeAnnotation(x)));

        const now = labels.find((label: Date) => label.getTime() === currentHour.getTime());
        if (now) {
            annotations.push(nowAnnotation(now));
        }

    } else if (timeSpan === TimeSpan.week) {
        const weekdaysAnnotation = (weekDay: any) => ({
            value: labels[weekDay.day - 1],
            borderDash: [8, 8],
            borderColor: '#888',
            label: {
                backgroundColor: '#888',
                content: weekDay.name
            }
        });

        let weekdaysToAnnotate = [
            { day: 2, name: 'Di' },
            { day: 3, name: 'Wo' },
            { day: 4, name: 'Do' },
            { day: 5, name: 'Vr' },
            { day: 6, name: 'Za' }
        ];

        if (beginningOfTheDayLabel) {
            weekdaysToAnnotate = weekdaysToAnnotate.filter((weekDay: any) => (currentHour.getDay() !== weekDay.day));
            annotations.push(nowAnnotation(beginningOfTheDayLabel));
        }
        weekdaysToAnnotate.forEach((weekDay: any) => annotations.push(weekdaysAnnotation(weekDay)));

    } else if (timeSpan === TimeSpan.month) {
        if (beginningOfTheDayLabel) {
            annotations.push(nowAnnotation(beginningOfTheDayLabel));
        }
    }

    return annotations;
};
