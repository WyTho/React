import {
    beautifyDate,
    cleanMilliSecondsAndSeconds,
    getBeginningOfTheDay, getBeginningOfTheMonth, getBeginningOfTheWeek
} from './dateUtilities';

export enum TimeSpan {
    day = 'day',
    week = 'week',
    month = 'month'
}

export const getLabelsAndValuesForChart = (timeSpan: TimeSpan, startDate: Date, data: any) => {
    // ...data: Array<{ chartname: string, data: any }>
    const labels: any[] = [];
    const values: any = {
        averageTemperature: [],
    };

    // The startDate now has the seconds and miliseconds set to 0
    startDate = cleanMilliSecondsAndSeconds(startDate);

    if (timeSpan === TimeSpan.day) {

        for (const week of data.data.weeks) {
            for (const day of week.days) {
                if (day.timestamp * 1000 === getBeginningOfTheDay(startDate).getTime()) {
                    for (let i = 0; i < day.values.length; i++) {
                        const dateValue = new Date((day.timestamp + (i * 60 * 60)) * 1000);
                        labels.push(dateValue);
                        values.averageTemperature.push( +day.values[i].toFixed(1) );
                    }
                }
            }
        }

    } else if (timeSpan === TimeSpan.week) {

        for (const week of data.data.weeks) {
            for (const day of week.days) {
                const dayDate = new Date(day.timestamp * 1000);
                if (getBeginningOfTheWeek(startDate).getTime() === getBeginningOfTheWeek(dayDate).getTime()) {
                    labels.push(new Date(day.timestamp * 1000));
                    const total = day.values.reduce((sum: number, value: number) => sum + value, 0);
                    values.averageTemperature.push((total / day.values.length).toFixed(1))
                }
            }
        }

    } else {

        for (const week of data.data.weeks) {
            for (const day of week.days) {
                const dayDate = new Date(day.timestamp * 1000);
                if (getBeginningOfTheMonth(startDate).getTime() === getBeginningOfTheMonth(dayDate).getTime()) {
                    labels.push(new Date(day.timestamp * 1000));
                    const total = day.values.reduce((sum: number, value: number) => sum + value, 0);
                    values.averageTemperature.push((total / day.values.length).toFixed(1))
                }
            }
        }

    }
    return { labels, values };
};
