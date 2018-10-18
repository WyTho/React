import { TimeSpan } from './chartDataUtilities';

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


    // ;
    const beautify = (d: Date) => {
        let second = d.getSeconds().toString();
        if (second.length === 1) second = '0' + second;
        let minute = d.getMinutes().toString();
        if (minute.length === 1) minute = '0' + minute;
        let hour = d.getHours().toString();
        if (hour.length === 1) hour = '0' + hour;
        const weekDay = weekNames[d.getDay()];
        const day = d.getDate().toString();
        const monthNr = d.getMonth();
        const month = monthNames[monthNr];
        const year = d.getFullYear().toString();
        const dateAsString = day + '/' + (monthNr + 1) + '/' + year;
        const time = hour + ':' + minute;
        const weekNr = getWeekNumber(d);
        return {
            second,
            minute,
            hour,
            weekDay,
            day,
            monthNr: monthNr.toString(),
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

export const getBeginningOfTheDay = (date: Date) => {
    const beginDate = new Date(date.getTime());
    beginDate.setHours(0, 0, 0, 0);
    return beginDate
};
export const getBeginningOfTheWeek = (date: Date) => {
    const getMonday = (d: Date) => {
        d = new Date(d);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    };
    return getMonday(date)
};
export const getEndOfTheWeek = (date: Date) => {
    const copy = new Date(date.getTime());
    copy.setDate(date.getDate() - (date.getDay() - 1) + 6);
    return copy;
};
export const getBeginningOfTheMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};
export const getEndOfTheMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getWeekNumber = (d: Date) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(( ( (d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

export const cleanMilliSecondsAndSeconds = (date: Date) => {
    const dummyDate = new Date('July 1, 1999');

    // clean-up date (set the miliseconds & seconds to 0)
    const cleanedDate: Date = new Date(date.getTime());
    cleanedDate.setMilliseconds(dummyDate.getMilliseconds());
    cleanedDate.setSeconds(dummyDate.getSeconds());
    return cleanedDate
};

export const getDisplayName = (timeSpan: TimeSpan, date: Date) => {
    const now = new Date();
    const diff = getDiffrenceIn(timeSpan, now, date);

    if (timeSpan === TimeSpan.day) {
        if (diff === 0) return beautifyDate(date, 'Vandaag ({DATE})');
        else if (diff === 1) return beautifyDate(date, 'Morgen ({DATE})');
        else if (diff === -1) return beautifyDate(date, 'Gister ({DATE})');
        else return beautifyDate(date, '{WEEK_DAY} ({DATE})');
    } else if (timeSpan === TimeSpan.week) {
        if (diff === 0) return beautifyDate(date, 'Deze week (Week {WEEK_NR}, {DATE} - {LAST_WEEK_DATE})');
        else if (diff === 1) return beautifyDate(date, 'Volgende week (Week {WEEK_NR}, {DATE} - {LAST_WEEK_DATE})');
        else if (diff === -1) return beautifyDate(date, 'Vorige week (Week {WEEK_NR}, {DATE} - {LAST_WEEK_DATE})');
        else return beautifyDate(date, 'Week {WEEK_NR} ({DATE} - {LAST_WEEK_DATE})');
    } else {
        if (diff === 0) return beautifyDate(date, 'Deze maand ({MONTH})');
        else if (diff === 1) return beautifyDate(date, 'Volgende maand ({MONTH})');
        else if (diff === -1) return beautifyDate(date, 'Vorige maand ({MONTH})');
        else return beautifyDate(date, '{MONTH} {YEAR}');
    }

};

export const getDiffrenceIn = (timeSpan: TimeSpan, date1: Date, date2: Date) => {
    date1 = getBeginningOfTheDay(cleanMilliSecondsAndSeconds(date1));
    date2 = getBeginningOfTheDay(cleanMilliSecondsAndSeconds(date2));
    const timeDiff = date2.getTime() - date1.getTime();

    let diff = -999;
    if (timeSpan === TimeSpan.day) {
        diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else if (timeSpan === TimeSpan.week) {
        diff = Math.ceil(timeDiff / (1000 * 3600 * 24 * 7));
    } else {
        let months = (date2.getFullYear() - date1.getFullYear()) * 12;
        months -= date1.getMonth();
        months += date2.getMonth();
        diff = months;
    }
    return diff
};

export const getPreviousDate = (timeSpan: TimeSpan, date: Date) => {
    return getNextOrPreviousDate('previous', timeSpan, date)
};
export const getNextDate = (timeSpan: TimeSpan, date: Date) => {
    return getNextOrPreviousDate('next', timeSpan, date)
};

const getNextOrPreviousDate = (type: string, timeSpan: TimeSpan, date: Date) => {
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
