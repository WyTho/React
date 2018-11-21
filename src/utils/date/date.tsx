import {TimeSpan} from './dateTypes';

export interface IDateRange {
    fromDate: Date,
    toDate: Date
}

export const epochTimestamp = (date: Date) => +(date.getTime().toString().slice(0, -3));

export const beautifyDate = (date: Date, format: string = '{DATE}'): string => {

    const monthNames = [
        'januari', 'februari', 'maart',
        'april', 'mei', 'juni', 'juli',
        'augustus', 'september', 'oktober',
        'november', 'december'
    ];

    const weekNames = [
        'Zondag',
        'Maandag',
        'Dinsdag',
        'Woensdag',
        'Donderdag',
        'Vrijdag',
        'Zaterdag'
    ];

    const beautify = (d: Date) => {
        let second = d.getSeconds().toString();
        if (second.length === 1) second = '0' + second;
        let minute = d.getMinutes().toString();
        if (minute.length === 1) minute = '0' + minute;
        let hour = d.getHours().toString();
        if (hour.length === 1) hour = '0' + hour;
        const weekDay = weekNames[d.getDay()];
        const day = d.getDate().toString();
        const monthIndex = d.getMonth();
        const month = monthNames[monthIndex];
        const year = d.getFullYear().toString();
        const dateAsString = day + '/' + (monthIndex + 1) + '/' + year;
        const time = hour + ':' + minute;
        const weekNr = getWeekNumber(d);
        return {
            second,
            minute,
            hour,
            weekDay,
            day,
            monthIndex: monthIndex.toString(),
            monthNr: (monthIndex + 1).toString(),
            weekNr: weekNr.toString(),
            month,
            year,
            dateAsString,
            time
        }
    };

    const formatted = beautify(date);

    return format
        .replace('{LAST_WEEK_DATE}', beautify(getEndOfTheWeek(date)).dateAsString)
        .replace('{LAST_MONTH_DATE}', beautify(getEndOfTheMonth(date)).dateAsString)
        .replace('{WEEK_NR}', formatted.weekNr)
        .replace('{MONTH_INDEX}', formatted.monthIndex)
        .replace('{MONTH_NR}', formatted.monthNr)
        .replace('{DATE}', formatted.dateAsString)
        .replace('{TIME}', formatted.time)
        .replace('{SECOND}', formatted.second)
        .replace('{MINUTE}', formatted.minute)
        .replace('{HOUR}', formatted.hour)
        .replace('{WEEK_DAY}', formatted.weekDay)
        .replace('{DAY}', formatted.day)
        .replace('{MONTH}', formatted.month)
        .replace('{YEAR}', formatted.year)
};

export const getBeginningOfTheHour = (date: Date): Date => {
    const beginDate = new Date(date);
    beginDate.setHours(date.getHours(), 0, 0, 0);
    return beginDate
};
export const getBeginningOfTheDay = (date: Date): Date => {
    const beginDate = new Date(date);
    beginDate.setHours(0, 0, 0, 0);
    return beginDate
};
export const getBeginningOfTheWeek = (date: Date): Date => {
    const getMonday = (d: Date) => {
        d = new Date(d);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    };
    return getBeginningOfTheDay(getMonday(date))
};
export const getEndOfTheWeek = (date: Date): Date => {
    const copy = new Date(date.getTime());
    const dayNr = (date.getDay() === 0) ? 6 : (date.getDay() - 1);
    copy.setDate(date.getDate() - dayNr + 6);
    return getBeginningOfTheDay(copy);
};
export const getBeginningOfTheMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};
export const getEndOfTheMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getWeekNumber = (d: Date): number => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(( ( (d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

export const cleanMilliSecondsAndSeconds = (date: Date): Date => {
    const dummyDate = new Date('July 1, 1999');

    // clean-up date (set the miliseconds & seconds to 0)
    const cleanedDate: Date = new Date(date.getTime());
    cleanedDate.setMilliseconds(dummyDate.getMilliseconds());
    cleanedDate.setSeconds(dummyDate.getSeconds());
    return cleanedDate
};

/**
 * This function checks the starting date of a chart and returns true if the chart is displaying
 * the current day/week/month (depending on the provided timespan)
 *
 * @param {TimeSpan} timeSpan
 * @param {Date} startingDate
 * @returns {boolean}
 */
export const chartIsAtCurrentTimespan = (timeSpan: TimeSpan, startingDate: Date): boolean => {
    const now = new Date();
    const diff = getDiffrenceIn(timeSpan, now, startingDate);
    return diff === 0
};

export const getCurrentTimespanDisplayName = (timeSpan: TimeSpan): string => {
    if (timeSpan === TimeSpan.day) {
        return 'Vandaag'
    } else if (timeSpan === TimeSpan.week) {
        return 'Deze week'
    } else {
        return 'Deze maand'
    }
};

export const getTimespanTooltip = (timeSpan: TimeSpan) => {
    if (timeSpan === TimeSpan.day) {
        return 'dag'
    } else if (timeSpan === TimeSpan.week) {
        return 'week'
    } else {
        return 'maand'
    }
};

export const getCurrentTimespanDisplayDate = (timeSpan: TimeSpan): string => {
    const now = new Date();
    return getDisplayDateForTimespan(timeSpan, now)
};

export const getDisplayDateForTimespan = (timeSpan: TimeSpan, date: Date): string => {
    if (timeSpan === TimeSpan.day) {
        return beautifyDate(date, '{DATE}');
    } else if (timeSpan === TimeSpan.week) {
        return beautifyDate(date, 'Week {WEEK_NR}, {DATE} - {LAST_WEEK_DATE}');
    } else {
        return beautifyDate(date, '{MONTH}');
    }
};

export const getDiffrenceIn = (timeSpan: TimeSpan, date1: Date, date2: Date): number => {
    date1 = getBeginningOfTheDay(cleanMilliSecondsAndSeconds(date1));
    date2 = getBeginningOfTheDay(cleanMilliSecondsAndSeconds(date2));
    const timeDiff = date2.getTime() - date1.getTime();

    let diff;
    if (timeSpan === TimeSpan.day) {
        diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else if (timeSpan === TimeSpan.week) {
        // TODO: calculate week diffrence diffrently
        diff = Math.ceil(timeDiff / (1000 * 3600 * 24 * 7));
    } else {
        let months = (date2.getFullYear() - date1.getFullYear()) * 12;
        months -= date1.getMonth();
        months += date2.getMonth();
        diff = months;
    }
    return diff
};

export const getPreviousDate = (timeSpan: TimeSpan, date: Date): Date => {
    return getNextOrPreviousDate('previous', timeSpan, date)
};
export const getNextDate = (timeSpan: TimeSpan, date: Date): Date => {
    return getNextOrPreviousDate('next', timeSpan, date)
};

const getNextOrPreviousDate = (type: string, timeSpan: TimeSpan, date: Date): Date => {
    date = cleanMilliSecondsAndSeconds(date);
    if (timeSpan === TimeSpan.day) {
        type === 'previous' ? date.setDate(date.getDate() - 1) : date.setDate(date.getDate() + 1)
    } else if (timeSpan === TimeSpan.week) {
        type === 'previous' ? date.setDate(date.getDate() - 7) : date.setDate(date.getDate() + 7)
    } else {
        type === 'previous' ? date.setMonth(date.getMonth() - 1) : date.setMonth(date.getMonth() + 1)
    }
    return date
};

export const getDateRangeOfSixtyDaysAround = (centerDate: Date): IDateRange => {
    const fromDate = getBeginningOfTheWeek(getBeginningOfTheDay(subtractDays(new Date(centerDate.getTime()), 60)));
    const toDate = getEndOfTheWeek(getBeginningOfTheDay(addDays(new Date(centerDate.getTime()), 60)));
    return { fromDate, toDate }
};

export const addDays = (date: Date, days: number) => {
    const copy = new Date(date.getTime());
    copy.setDate(copy.getDate() + days);
    return copy;
};
export const subtractDays = (date: Date, days: number) => {
    const copy = new Date(date.getTime());
    copy.setDate(copy.getDate() - days);
    return copy;
};
