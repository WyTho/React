import {
    getBeginningOfTheDay,
    getBeginningOfTheHour,
    getBeginningOfTheMonth,
    getBeginningOfTheWeek, getEndOfTheMonth
} from '../date/date';
import {IAnnotation, IData} from './chartTypes';
import {TimeSpan} from '../date/dateTypes';
import {hexToRgba, isNumber} from '../other';
import {Theme} from '@material-ui/core';
import {TypeOf} from '../otherTypes';

export const createGradientForChart = (canvas: any, hexColor: string) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, hexColor);
    gradient.addColorStop(0.3, hexColor);
    gradient.addColorStop(1, hexToRgba(hexColor, 0.3));
    return gradient
};

export const getLabelsForChart = (timeSpan: TimeSpan, startDate: Date): string[] => {
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
        amountOfLabels = getEndOfTheMonth(startDate).getDate();
        startTime = getBeginningOfTheMonth(startDate).getTime();
        addTime = 24 * 60 * 60 * 1000;
    }

    for (let i = 0; i < amountOfLabels; i++) {
        labels.push(new Date(startTime + (i * addTime)));
    }

    return labels
};

export const getValuesForChart = (timeSpan: TimeSpan, startDate: Date, data: IData, typeofValues: TypeOf = TypeOf.NUMBER) => {
    const values: any[] = [];

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

    return values;

    // helper functions
    function pushAllHoursOfDay(day: any) {
        for (const value of day.values) {
            if (typeofValues === TypeOf.NUMBER) {
                values.push(isNumber(value) ? +value.toFixed(1) : null );
            }
        }
    }
    function pushDay(day: any) {
        if (typeofValues === TypeOf.NUMBER) {
            const average = day.values.reduce((store: any, value: number, index: number) => {
                if (value !== null) {
                    store.total += value;
                    store.avg = store.total / index + 1;
                }
                return store
            }, { total: 0, average: null }).avg;
            values.push(isNumber(average) ? +average.toFixed(1) : null)
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

export const createAnnotationsForTimeSpan = (
    timeSpan: TimeSpan,
    labels: any[],
    currentHour: Date,
    theme: Theme,
    yAxesHeight: number = 0
): IAnnotation[] => {

    const annotations: IAnnotation[] = [];
    annotations.push(createInvisibleHeightAnnotation());

    const beginningOfTheDayLabel = labels.find((label: Date) => label.getTime() === getBeginningOfTheDay(currentHour).getTime());

    if (timeSpan === TimeSpan.day) {

        let timesToAnnotate = [6, 12, 18];
        timesToAnnotate = timesToAnnotate.filter((x: number) => currentHour.getHours() !== x);
        timesToAnnotate.forEach((hour: number) => annotations.push(createHourAnnotation(hour)));

        const now = labels.find((label: Date) => label.getTime() === currentHour.getTime());
        if (now) {
            annotations.push(createNowAnnotation(now));
        }

    } else if (timeSpan === TimeSpan.week) {

        let weekdaysToAnnotate = [
            { day: 2, name: 'Di' },
            { day: 3, name: 'Wo' },
            { day: 4, name: 'Do' },
            { day: 5, name: 'Vr' },
            { day: 6, name: 'Za' }
        ];
        if (beginningOfTheDayLabel) {
            weekdaysToAnnotate = weekdaysToAnnotate.filter((weekDay: any) => (currentHour.getDay() !== weekDay.day));
            annotations.push(createNowAnnotation(beginningOfTheDayLabel));
        }
        weekdaysToAnnotate.forEach((weekDay: any) => annotations.push(createWeekdayAnnotation(weekDay)));

    } else if (timeSpan === TimeSpan.month) {

        let datesToAnnotate = [5, 10, 15, 20, 25];
        if (beginningOfTheDayLabel) {
            datesToAnnotate = datesToAnnotate.filter((day: number) => (currentHour.getDate() !== day));
            annotations.push(createNowAnnotation(beginningOfTheDayLabel));
        }
        datesToAnnotate.forEach((day: number) => annotations.push(createMonthDateAnnotation(day)));
    }

    return addMissingValuesForAnnotations(annotations);

    function createInvisibleHeightAnnotation() {
        return {
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: yAxesHeight,

            borderWidth: 0,
            borderColor: 'transparent'
        }
    }
    function createNowAnnotation(value: any): IAnnotation {
        return {
            drawTime: 'afterDatasetsDraw',
            value,
            borderColor: theme.palette.secondary.main,
            borderWidth: 2,
            borderDash: [3, 3],
            label: {
                backgroundColor: theme.palette.secondary.main,
                content: 'Nu'
            }
        }
    }
    function createHourAnnotation(hour: number): IAnnotation {
        return {
            value: labels[hour],
            borderDash: [8, 8],
            borderColor: '#888',
            label: {
                backgroundColor: '#888',
                content: hour + ':00'
            }
        }
    }
    function createWeekdayAnnotation(weekDay: {day: number, name: string}): IAnnotation {
        return {
            value: labels[weekDay.day - 1],
            borderDash: [8, 8],
            borderColor: '#888',
            label: {
                backgroundColor: '#888',
                content: weekDay.name
            }
        }
    }
    function createMonthDateAnnotation(day: number): IAnnotation {
        return {
            value: labels[day - 1],
            borderDash: [8, 8],
            borderColor: '#888',
            label: {
                backgroundColor: '#888',
                content: day.toString()
            }
        }
    }
    function addMissingValuesForAnnotations(incompleteAnnotations: IAnnotation[]) {
        const fullAnnotations: IAnnotation[] = [];
        incompleteAnnotations.forEach((annotation: IAnnotation) => {
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
            fullAnnotations.push({
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
        return fullAnnotations
    }
};
