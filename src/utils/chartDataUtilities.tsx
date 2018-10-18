import {
    beautifyDate,
    cleanMilliSecondsAndSeconds,
    getBeginningOfTheDay
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
                    // console.log('TODAY\'s week is', week);
                    // console.log('TODAY\'s day is', day);
                    // console.log('RIGHT NOW THE hour is', startDate.getHours());
                    // console.log('RIGHT NOW THE minutes are', startDate.getMinutes());
                    // console.log('Right now the closest hour is:', getClosestHour(startDate));
                    for (let i = 0; i < day.values.length; i++) {
                        const dateValue = new Date((day.timestamp + (i * 60 * 60)) * 1000);
                        labels.push(beautifyDate(dateValue, '{DATE} om {TIME}'));
                        values.averageTemperature.push( +day.values[i].toFixed() );
                    }
                }
            }
        }

    } else if (timeSpan === TimeSpan.week) {

        for (const week of data.data.weeks) {
            for (const day of week.days) {

            }
        }

    } else {

        for (const week of data.data.weeks) {
            for (const day of week.days) {

            }
        }

    }
    return { labels, values };
};
