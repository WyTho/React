import * as dateUtils from './date';
import {TimeSpan} from './dateTypes';
import {subtractDays} from './date';
import {addDays} from './date';
import {getEndOfTheWeek} from './date';
import {getBeginningOfTheWeek} from './date';
import {getBeginningOfTheDay} from './date';
describe('date.tsx (utils)', () => {

    // Woensdag 21/11/2018 @ 12:43:37 (HH:MM:SS)
    const date = new Date(1542800617045);

    const today = new Date();

    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 90000);

    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 90000);

    describe('epochTimestamp()', () => {
        const func = dateUtils.epochTimestamp;

        it('should return the epochTimestamp as a number', () => {
            expect(typeof func(new Date())).toBe('number');
        });

        it('should remove 3 trailing numbers from a javascript timestamp', () => {
            expect(func(date)).toBe(1542800617);
            expect(func(new Date(1542800617000))).toBe(1542800617);
            expect(func(new Date(1542800617999))).toBe(1542800617);
        })

    });

    describe('beautifyDate()', () => {
        const func = dateUtils.beautifyDate;

        it('should beautify a date to a string with the wanted {PART}', () => {
            expect(func(date, '{LAST_WEEK_DATE}')).toBe('25/11/2018');
            expect(func(date, '{LAST_MONTH_DATE}')).toBe('30/11/2018');
            expect(func(date, '{WEEK_NR}')).toBe('47');
            expect(func(date, '{MONTH_INDEX}')).toBe('10');
            expect(func(date, '{MONTH_NR}')).toBe('11');
            expect(func(date, '{DATE}')).toBe('21/11/2018');
            expect(func(date, '{TIME}')).toBe('12:43');
            expect(func(date, '{SECOND}')).toBe('37');
            expect(func(date, '{MINUTE}')).toBe('43');
            expect(func(date, '{HOUR}')).toBe('12');
            expect(func(date, '{WEEK_DAY}')).toBe('Woensdag');
            expect(func(date, '{DAY}')).toBe('21');
            expect(func(date, '{MONTH}')).toBe('november');
            expect(func(date, '{YEAR}')).toBe('2018');
        });
        it('should convert the LAST_WEEK_DATE to the same date if it\'s already sunday', () => {

            const sundayDateParts = func(date, '{LAST_WEEK_DATE}').split('/').reverse().map(x => +x);

            const beginningOfSunday = new Date(
                sundayDateParts[0],
                sundayDateParts[1] - 1,  // -1 to get the Month index (10) instead of the actual month number (11)
                sundayDateParts[2],
                0, 0, 0, 0
            );

            const halfwayTroughSunday = new Date(
                sundayDateParts[0],
                sundayDateParts[1] - 1,
                sundayDateParts[2],
                12, 30, 0, 0
            );

            expect(func(beginningOfSunday, '{LAST_WEEK_DATE}'))
                .toBe(func(beginningOfSunday, '{DATE}'));

            expect(func(halfwayTroughSunday, '{LAST_WEEK_DATE}'))
                .toBe(func(halfwayTroughSunday, '{DATE}'));

        });
        it('should convert the LAST_MONTH_DATE to the same day if it\'s already the last day of the month', () => {

            const lastDateOfTheMonthDateParts = func(date, '{LAST_MONTH_DATE}').split('/').reverse().map(x => +x);

            const beginningOflastDayOfTheMonth = new Date(
                lastDateOfTheMonthDateParts[0],
                lastDateOfTheMonthDateParts[1] - 1,
                lastDateOfTheMonthDateParts[2],
                0, 0, 0, 0
            );

            const halfwayTroughlastDayOfTheMonth = new Date(
                lastDateOfTheMonthDateParts[0],
                lastDateOfTheMonthDateParts[1] - 1,
                lastDateOfTheMonthDateParts[2],
                12, 30, 0, 0
            );

            expect(func(beginningOflastDayOfTheMonth, '{LAST_MONTH_DATE}'))
                .toBe(func(beginningOflastDayOfTheMonth, '{DATE}'));

            expect(func(halfwayTroughlastDayOfTheMonth, '{LAST_MONTH_DATE}'))
                .toBe(func(halfwayTroughlastDayOfTheMonth, '{DATE}'));

        });
        it('should beautify a date to a string with combined {PARTS}', () => {
            expect(func(date, 'Het is {WEEK_DAY}, {DAY} {MONTH} ({YEAR}).'))
                .toBe('Het is Woensdag, 21 november (2018).');
        });
        it('should ignore unknown {PARTS} of the string', () => {
            expect(func(date, 'Hello, {SOMETHING_UNKNOWN}'))
                .toBe('Hello, {SOMETHING_UNKNOWN}');
        });
    });

    describe('getBeginningOfTheHour()', () => {
        const func = dateUtils.getBeginningOfTheHour;

        it('should get the beginning of the hour (set minutes, seconds and milliseconds to 0)', () => {
            expect(func(date).getHours()).toBe(date.getHours());
            expect(func(date).getMinutes()).toBe(0);
            expect(func(date).getSeconds()).toBe(0);
            expect(func(date).getMilliseconds()).toBe(0);
        });
        it('should not use the original date object (it should make a copy)', () => {
            shouldMakeACopyOfTheDateObject(func, date)
        });
    });

    describe('getBeginningOfTheDay()', () => {
        const func = dateUtils.getBeginningOfTheDay;

        it('should get the beginning of the day (set hours, minutes, seconds and milliseconds to 0)', () => {
            shouldGetTheBeginningOfTheDay(func, date)
        });
        it('should not use the original date object (it should make a copy)', () => {
            shouldMakeACopyOfTheDateObject(func, date)
        });
    });

    describe('getBeginningOfTheWeek()', () => {
        const func = dateUtils.getBeginningOfTheWeek;

        it('should be the first day of the week', () => {
            const monday = 1;
            expect(func(date).getDay()).toBe(monday);
        });
        it('should get the beginning of the day (set hours, minutes, seconds and milliseconds to 0)', () => {
            shouldGetTheBeginningOfTheDay(func, date)
        });
        it('should not use the original date object (it should make a copy)', () => {
            shouldMakeACopyOfTheDateObject(func, date)
        });
    });

    describe('getEndOfTheWeek()', () => {
        const func = dateUtils.getEndOfTheWeek;

        it('should be the last day of the week', () => {
            const sunday = 0;
            expect(func(date).getDay()).toBe(sunday);
        });
        it('should get the beginning of the day (set hours, minutes, seconds and milliseconds to 0)', () => {
            shouldGetTheBeginningOfTheDay(func, date)
        });
        it('should not use the original date object (it should make a copy)', () => {
            shouldMakeACopyOfTheDateObject(func, date)
        });
    });

    describe('getBeginningOfTheMonth()', () => {
        const func = dateUtils.getBeginningOfTheMonth;

        it('should be the last day of the month', () => {
            expect(func(date).getDate()).toBe(1);
        });
        it('should get the beginning of the day (set hours, minutes, seconds and milliseconds to 0)', () => {
            shouldGetTheBeginningOfTheDay(func, date)
        });
        it('should not use the original date object (it should make a copy)', () => {
            shouldMakeACopyOfTheDateObject(func, date)
        });
    });

    describe('getEndOfTheMonth()', () => {
        const func = dateUtils.getEndOfTheMonth;

        it('should be the last day of the month', () => {
            expect(func(date).getDate()).toBe(30);
        });
        it('should get the beginning of the day (set hours, minutes, seconds and milliseconds to 0)', () => {
            shouldGetTheBeginningOfTheDay(func, date)
        });
        it('should not use the original date object (it should make a copy)', () => {
            shouldMakeACopyOfTheDateObject(func, date)
        });
    });

    describe('getWeekNumber()', () => {
        const func = dateUtils.getWeekNumber;

        it('should get the week number', () => {
            expect(func(date)).toBe(47);
        });
        it('should get the same week number on the upcoming sunday', () => {
            const sundayDateParts = dateUtils.beautifyDate(date, '{LAST_WEEK_DATE}').split('/').reverse().map(x => +x);

            const sunday = new Date(
                sundayDateParts[0],
                sundayDateParts[1] - 1,  // -1 to get the Month index (10) instead of the actual month number (11)
                sundayDateParts[2],
                0, 0, 0, 0
            );
            expect(func(sunday)).toBe(47);
        });
    });

    describe('cleanMilliSecondsAndSeconds()', () => {
        const func = dateUtils.cleanMilliSecondsAndSeconds;

        it('should get the beginning of the minute (set seconds and milliseconds to 0)', () => {
            expect(func(date).getHours()).toBe(date.getHours());
            expect(func(date).getMinutes()).toBe(date.getMinutes());
            expect(func(date).getSeconds()).toBe(0);
            expect(func(date).getMilliseconds()).toBe(0);
        });
        it('should not use the original date object (it should make a copy)', () => {
            shouldMakeACopyOfTheDateObject(func, date)
        });
    });

    describe('chartIsAtCurrentTimespan()', () => {
        const func = dateUtils.chartIsAtCurrentTimespan;

        it('should be true for every timestamp if the date is today', () => {
            expect(func(TimeSpan.day, today)).toBe(true);
            expect(func(TimeSpan.week, today)).toBe(true);
            expect(func(TimeSpan.month, today)).toBe(true);
        });

        describe('chartIsAtCurrent DAY', () => {
            it('should be true for every hour that falls within the current day', () => {
                const endOfToday = new Date(today);
                endOfToday.setHours(23);
                endOfToday.setMinutes(59);
                endOfToday.setSeconds(59);
                endOfToday.setMilliseconds(999);

                expect(func(TimeSpan.month, dateUtils.getBeginningOfTheDay(today))).toBe(true);
                expect(func(TimeSpan.month, endOfToday)).toBe(true);
            });
            it('should be false for every other date than today', () => {
                const yesterday = new Date();
                const tomorrow = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                tomorrow.setDate(tomorrow.getDate() + 1);

                expect(func(TimeSpan.day, yesterday)).toBe(false);
                expect(func(TimeSpan.day, tomorrow)).toBe(false);
            });
        });

        describe('chartIsAtCurrent WEEK', () => {
            it('should be false for every date that falls outside the current week', () => {
                const sundayBeforeThisWeek = dateUtils.getBeginningOfTheWeek(today);
                const mondayAfterThisWeek = dateUtils.getEndOfTheWeek(today);

                sundayBeforeThisWeek.setDate(sundayBeforeThisWeek.getDate() - 1);
                mondayAfterThisWeek.setDate(mondayAfterThisWeek.getDate() + 1);

                expect(func(TimeSpan.week, sundayBeforeThisWeek)).toBe(false);
                expect(func(TimeSpan.week, mondayAfterThisWeek)).toBe(false);
            });
        });

        describe('chartIsAtCurrent MONTH', () => {
            it('should be true for every date that falls within the current month', () => {
                expect(func(TimeSpan.month, dateUtils.getBeginningOfTheMonth(today))).toBe(true);
                expect(func(TimeSpan.month, dateUtils.getEndOfTheMonth(today))).toBe(true);
            });
            it('should be false for every date that falls outside the current month', () => {
                const endOfPreviousMonth = dateUtils.getBeginningOfTheMonth(today);
                const beginningOfNextMonth = dateUtils.getEndOfTheMonth(today);

                endOfPreviousMonth.setDate(endOfPreviousMonth.getDate() - 1);
                beginningOfNextMonth.setDate(beginningOfNextMonth.getDate() + 1);

                expect(func(TimeSpan.month, endOfPreviousMonth)).toBe(false);
                expect(func(TimeSpan.month, beginningOfNextMonth)).toBe(false);
            });
        })
    });

    describe('getCurrentTimespanDisplayName()', () => {
        const func = dateUtils.getCurrentTimespanDisplayName;

        it('should have the correct displayname for each timespan', () => {
            expect(func(TimeSpan.day)).toBe('Vandaag');
            expect(func(TimeSpan.week)).toBe('Deze week');
            expect(func(TimeSpan.month)).toBe('Deze maand');
        });
    });

    describe('getTimespanTooltip()', () => {
        const func = dateUtils.getTimespanTooltip;

        it('should have the correct tooltip for each timespan', () => {
            expect(func(TimeSpan.day)).toBe('dag');
            expect(func(TimeSpan.week)).toBe('week');
            expect(func(TimeSpan.month)).toBe('maand');
        });
    });

    describe('getCurrentTimespanDisplayDate()', () => {
        const func = dateUtils.getCurrentTimespanDisplayDate;

        it('should have the correct name for today', () => {
            expect(func(TimeSpan.day)).toBe(dateUtils.beautifyDate(today, '{DATE}'));
            expect(func(TimeSpan.week)).toBe(dateUtils.beautifyDate(today, 'Week {WEEK_NR}, {DATE} - {LAST_WEEK_DATE}'));
            expect(func(TimeSpan.month)).toBe(dateUtils.beautifyDate(today, '{MONTH}'));
        });
    });

    describe('getDisplayDateForTimespan()', () => {
        const func = dateUtils.getDisplayDateForTimespan;

        it('should have the correct name for today', () => {
            const testWithDate = (d: Date) => {
                expect(func(TimeSpan.day, d)).toBe(dateUtils.beautifyDate(d, '{DATE}'));
                expect(func(TimeSpan.week, d)).toBe(dateUtils.beautifyDate(d, 'Week {WEEK_NR}, {DATE} - {LAST_WEEK_DATE}'));
                expect(func(TimeSpan.month, d)).toBe(dateUtils.beautifyDate(d, '{MONTH}'));
            };

            testWithDate(date);
            testWithDate(today);
            testWithDate(futureDate);
            testWithDate(pastDate);
        });
    });

    describe('getDiffrenceIn()', () => {
        const func = dateUtils.getDiffrenceIn;
        describe('timeSpan DAY', () => {
            it('should be a diffrence of 0 days when comparing today to today', () => {
                expect(func(TimeSpan.day, today, today)).toBe(0);
            });
            it('should be a diffrence of 0 days when comparing the beginning of the day and the end of the day', () => {
                const beginningOfTheDay = dateUtils.getBeginningOfTheDay(today);
                const endOfTheDay = new Date();
                endOfTheDay.setDate(beginningOfTheDay.getDate());
                endOfTheDay.setHours(23);
                endOfTheDay.setMinutes(59);
                endOfTheDay.setSeconds(59);
                endOfTheDay.setMilliseconds(999);

                expect(func(TimeSpan.day, beginningOfTheDay, endOfTheDay)).toBe(0);
            });

            it('should be a diffrence of 1 day when comparing today to tomorrow', () => {
                const tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1);
                expect(func(TimeSpan.day, today, tomorrow)).toBe(1);
            });
            it('should be a diffrence of -1 day when comparing today to yesterday', () => {
                const yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                expect(func(TimeSpan.day, today, yesterday)).toBe(-1);
            });

            it('should be a diffrence of 90000 when comparing today to 90000 days in the future', () => {
                const somewhereInTheFuture = new Date();
                somewhereInTheFuture.setDate(today.getDate() + 90000);
                expect(func(TimeSpan.day, today, somewhereInTheFuture)).toBe(90000);
            });
            it('should be a diffrence of -90000 when comparing today to 90000 days in the past', () => {
                const somewhereInThePast = new Date();
                somewhereInThePast.setDate(today.getDate() - 90000);
                expect(func(TimeSpan.day, today, somewhereInThePast)).toBe(-90000);
            });
        });
        describe('timeSpan WEEK', () => {
            it('should be a diffrence of 0 weeks when comparing today to today', () => {
                expect(func(TimeSpan.week, today, today)).toBe(0);
            });
            it('should be a diffrence of 0 weeks when comparing the beginning of the week to the end of the week', () => {
                const beginningOfTheWeek = dateUtils.getBeginningOfTheWeek(today);
                const endOfTheWeek = dateUtils.getEndOfTheWeek(today);
                expect(func(TimeSpan.week, beginningOfTheWeek, endOfTheWeek)).toBe(0);
            });

            it('should be a diffrence of 1 week when comparing this week to next week', () => {
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);
                expect(func(TimeSpan.week, today, nextWeek)).toBe(1);
            });
            it('should be a diffrence of 1 week when comparing the beginning of this week to the beginning of next week', () => {
                const beginningOfThisWeek = dateUtils.getBeginningOfTheWeek(today);
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);
                const beginningOfNextWeek = dateUtils.getBeginningOfTheWeek(nextWeek);
                expect(func(TimeSpan.week, beginningOfThisWeek, beginningOfNextWeek)).toBe(1);
            });
            it('should be a diffrence of 1 week when comparing the end of this week to the end of next week', () => {
                const endOfThisWeek = dateUtils.getEndOfTheWeek(today);
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);
                const endOfNextWeek = dateUtils.getEndOfTheWeek(nextWeek);
                expect(func(TimeSpan.week, endOfThisWeek, endOfNextWeek)).toBe(1);
            });

            it('should be a diffrence of -1 week when comparing this week to the previous week', () => {
                const previousWeek = new Date();
                previousWeek.setDate(today.getDate() - 7);
                expect(func(TimeSpan.week, today, previousWeek)).toBe(-1);
            });
            it('should be a diffrence of -1 week when comparing the beginning of this week to the beginning of the previous week', () => {
                const beginningOfThisWeek = dateUtils.getBeginningOfTheWeek(today);
                const previousWeek = new Date();
                previousWeek.setDate(today.getDate() - 7);
                const beginningOfNextWeek = dateUtils.getBeginningOfTheWeek(previousWeek);
                expect(func(TimeSpan.week, beginningOfThisWeek, beginningOfNextWeek)).toBe(-1);
            });
            it('should be a diffrence of -1 week when comparing the end of this week to the end of the previous week', () => {
                const endOfThisWeek = dateUtils.getEndOfTheWeek(today);
                const previousWeek = new Date();
                previousWeek.setDate(today.getDate() - 7);
                const endOfPreviousWeek = dateUtils.getEndOfTheWeek(previousWeek);
                expect(func(TimeSpan.week, endOfThisWeek, endOfPreviousWeek)).toBe(-1);
            });

            it('should be a diffrence of 999 weeks when comparing this week to (999 * 7 days) from now', () => {
                const someFutureDay = new Date();
                someFutureDay.setDate(today.getDate() + (999 * 7));

                expect(func(TimeSpan.week, today, someFutureDay)).toBe(999);
            });
            it('should be a diffrence of 2 weeks when comparing the beginning of this week to the end of the week, 2 weeks from now', () => {
                const beginningOfThisWeek = dateUtils.getBeginningOfTheWeek(today);
                let endOfTheWeek2WeeksFromNow = new Date();
                endOfTheWeek2WeeksFromNow.setDate(beginningOfThisWeek.getDate() + 14);
                endOfTheWeek2WeeksFromNow = dateUtils.getEndOfTheWeek(endOfTheWeek2WeeksFromNow);

                expect(func(TimeSpan.week, beginningOfThisWeek, endOfTheWeek2WeeksFromNow)).toBe(2);
            });
        });
        describe('timeSpan MONTH', () => {
            it('should be a diffrence of 0 months when comparing today to today', () => {
                expect(func(TimeSpan.month, today, today)).toBe(0);
            });
            it('should be a diffrence of 0 month when comparing the beginning of this month to the end of this month', () => {
                const beginningOfThisMonth = dateUtils.getBeginningOfTheMonth(today);
                const endOfThisMonth = dateUtils.getEndOfTheMonth(today);
                expect(func(TimeSpan.month, beginningOfThisMonth, endOfThisMonth)).toBe(0);
                expect(func(TimeSpan.month, endOfThisMonth, beginningOfThisMonth)).toBe(0);
            });
            it('should be a diffrence of 1 month when comparing today to next month', () => {
                const thisDateNextMonth = new Date();
                thisDateNextMonth.setMonth(today.getMonth() + 1);
                expect(func(TimeSpan.month, today, thisDateNextMonth)).toBe(1);
            });
            it('should be a diffrence of -1 month when comparing today to the previous month', () => {
                const thisDatePreviousMonth = new Date();
                thisDatePreviousMonth.setMonth(today.getMonth() - 1);
                expect(func(TimeSpan.month, today, thisDatePreviousMonth)).toBe(-1);
            });
            it('should be a diffrence of 1 month when comparing the beginning of this month to the end of next month', () => {
                const beginningOfThisMonth = dateUtils.getBeginningOfTheMonth(today);
                const thisDateNextMonth = new Date();
                thisDateNextMonth.setMonth(today.getMonth() + 1);
                const endOfNextMonth = dateUtils.getEndOfTheMonth(thisDateNextMonth);
                expect(func(TimeSpan.month, beginningOfThisMonth, endOfNextMonth)).toBe(1);
            });
        });
    });

    describe('getPreviousDate()', () => {
        const func = dateUtils.getPreviousDate;

        describe('previous day', () => {
            const previousDayFrom = (d: Date) => {
                d = dateUtils.cleanMilliSecondsAndSeconds(d);
                const copy = new Date(d);
                copy.setDate(copy.getDate() - 1);
                return copy;
            };

            it('should trim seconds and milliseconds (set to 0)', () => {
                expect(func(TimeSpan.day, date).getMilliseconds()).toBe(0);
                expect(func(TimeSpan.day, date).getSeconds()).toBe(0);
            });
            it('should get previous day', () => {
                expect(func(TimeSpan.day, date).getTime()).toBe(previousDayFrom(date).getTime());
                expect(func(TimeSpan.day, today).getTime()).toBe(previousDayFrom(today).getTime());
                expect(func(TimeSpan.day, futureDate).getTime()).toBe(previousDayFrom(futureDate).getTime());
                expect(func(TimeSpan.day, pastDate).getTime()).toBe(previousDayFrom(pastDate).getTime());
            });
        });

        describe('previous week', () => {
            const previousWeekFrom = (d: Date) => {
                d = dateUtils.cleanMilliSecondsAndSeconds(d);
                const copy = new Date(d);
                copy.setDate(copy.getDate() - 7);
                return copy;
            };

            it('should trim seconds and milliseconds (set to 0)', () => {
                expect(func(TimeSpan.week, date).getMilliseconds()).toBe(0);
                expect(func(TimeSpan.week, date).getSeconds()).toBe(0);
            });
            it('should get previous week', () => {
                expect(func(TimeSpan.week, date).getTime()).toBe(previousWeekFrom(date).getTime());
                expect(func(TimeSpan.week, today).getTime()).toBe(previousWeekFrom(today).getTime());
                expect(func(TimeSpan.week, futureDate).getTime()).toBe(previousWeekFrom(futureDate).getTime());
                expect(func(TimeSpan.week, pastDate).getTime()).toBe(previousWeekFrom(pastDate).getTime());
            });
        });

        describe('previous month', () => {
            const previousMonthFrom = (d: Date) => {
                d = dateUtils.cleanMilliSecondsAndSeconds(d);
                const copy = new Date(d);
                copy.setMonth(copy.getMonth() - 1);
                return copy;
            };

            it('should trim seconds and milliseconds (set to 0)', () => {
                expect(func(TimeSpan.month, date).getMilliseconds()).toBe(0);
                expect(func(TimeSpan.month, date).getSeconds()).toBe(0);
            });
            it('should get previous week', () => {
                expect(func(TimeSpan.month, date).getTime()).toBe(previousMonthFrom(date).getTime());
                expect(func(TimeSpan.month, today).getTime()).toBe(previousMonthFrom(today).getTime());
                expect(func(TimeSpan.month, futureDate).getTime()).toBe(previousMonthFrom(futureDate).getTime());
                expect(func(TimeSpan.month, pastDate).getTime()).toBe(previousMonthFrom(pastDate).getTime());
            });
        })
    });

    describe('getNextDate()', () => {
        const func = dateUtils.getNextDate;

        describe('next day', () => {
            const nextDayFrom = (d: Date) => {
                d = dateUtils.cleanMilliSecondsAndSeconds(d);
                const copy = new Date(d);
                copy.setDate(copy.getDate() + 1);
                return copy;
            };

            it('should trim seconds and milliseconds (set to 0)', () => {
                expect(func(TimeSpan.day, date).getMilliseconds()).toBe(0);
                expect(func(TimeSpan.day, date).getSeconds()).toBe(0);
            });
            it('should get next day', () => {
                expect(func(TimeSpan.day, date).getTime()).toBe(nextDayFrom(date).getTime());
                expect(func(TimeSpan.day, today).getTime()).toBe(nextDayFrom(today).getTime());
                expect(func(TimeSpan.day, futureDate).getTime()).toBe(nextDayFrom(futureDate).getTime());
                expect(func(TimeSpan.day, pastDate).getTime()).toBe(nextDayFrom(pastDate).getTime());
            });
        });

        describe('next week', () => {
            const nextWeekFrom = (d: Date) => {
                d = dateUtils.cleanMilliSecondsAndSeconds(d);
                const copy = new Date(d);
                copy.setDate(copy.getDate() + 7);
                return copy;
            };

            it('should trim seconds and milliseconds (set to 0)', () => {
                expect(func(TimeSpan.week, date).getMilliseconds()).toBe(0);
                expect(func(TimeSpan.week, date).getSeconds()).toBe(0);
            });
            it('should get next week', () => {
                expect(func(TimeSpan.week, date).getTime()).toBe(nextWeekFrom(date).getTime());
                expect(func(TimeSpan.week, today).getTime()).toBe(nextWeekFrom(today).getTime());
                expect(func(TimeSpan.week, futureDate).getTime()).toBe(nextWeekFrom(futureDate).getTime());
                expect(func(TimeSpan.week, pastDate).getTime()).toBe(nextWeekFrom(pastDate).getTime());
            });
        });

        describe('next month', () => {
            const nextMonthFrom = (d: Date) => {
                d = dateUtils.cleanMilliSecondsAndSeconds(d);
                const copy = new Date(d);
                copy.setMonth(copy.getMonth() + 1);
                return copy;
            };

            it('should trim seconds and milliseconds (set to 0)', () => {
                expect(func(TimeSpan.month, date).getMilliseconds()).toBe(0);
                expect(func(TimeSpan.month, date).getSeconds()).toBe(0);
            });
            it('should get previous week', () => {
                expect(func(TimeSpan.month, date).getTime()).toBe(nextMonthFrom(date).getTime());
                expect(func(TimeSpan.month, today).getTime()).toBe(nextMonthFrom(today).getTime());
                expect(func(TimeSpan.month, futureDate).getTime()).toBe(nextMonthFrom(futureDate).getTime());
                expect(func(TimeSpan.month, pastDate).getTime()).toBe(nextMonthFrom(pastDate).getTime());
            });
        })
    });

    describe('getDateRangeOfSixtyDaysAround()', () => {
        const func = dateUtils.getDateRangeOfSixtyDaysAround;

        it('should get a daterange of 60 days before and after the center date', () => {
            const dateRangeFrom = (d: Date) => {
                return getBeginningOfTheWeek(getBeginningOfTheDay(subtractDays(new Date(d.getTime()), 60)));
            };
            const dateRangeTo = (d: Date) => {
                return getEndOfTheWeek(getBeginningOfTheDay(addDays(new Date(d.getTime()), 60)));
            };
            expect(func(date).fromDate.getTime()).toBe(dateRangeFrom(date).getTime());
            expect(func(date).toDate.getTime()).toBe(dateRangeTo(date).getTime());

            expect(func(today).fromDate.getTime()).toBe(dateRangeFrom(today).getTime());
            expect(func(today).toDate.getTime()).toBe(dateRangeTo(today).getTime());

            expect(func(futureDate).fromDate.getTime()).toBe(dateRangeFrom(futureDate).getTime());
            expect(func(futureDate).toDate.getTime()).toBe(dateRangeTo(futureDate).getTime());

            expect(func(pastDate).fromDate.getTime()).toBe(dateRangeFrom(pastDate).getTime());
            expect(func(pastDate).toDate.getTime()).toBe(dateRangeTo(pastDate).getTime());
        })
    });

    describe('addDays()', () => {
        const func = dateUtils.addDays;
        it('should add X days', () => {
            const addDaysToDate = (d: Date, days: number) => {
                const copy = new Date(d.getTime());
                copy.setDate(copy.getDate() + days);
                return copy;
            };
            expect(func(date, 1).getTime()).toBe(addDaysToDate(date, 1).getTime());
            expect(func(today, 1).getTime()).toBe(addDaysToDate(today, 1).getTime());
            expect(func(futureDate, 1).getTime()).toBe(addDaysToDate(futureDate, 1).getTime());
            expect(func(pastDate, 1).getTime()).toBe(addDaysToDate(pastDate, 1).getTime());
            expect(func(date, 200).getTime()).toBe(addDaysToDate(date, 200).getTime());
            expect(func(today, 200).getTime()).toBe(addDaysToDate(today, 200).getTime());
            expect(func(futureDate, 200).getTime()).toBe(addDaysToDate(futureDate, 200).getTime());
            expect(func(pastDate, 200).getTime()).toBe(addDaysToDate(pastDate, 200).getTime());
        })
    });

    describe('subtractDays()', () => {
        const func = dateUtils.subtractDays;
        it('should subtract X days', () => {
            const subtractDaysFromDate = (d: Date, days: number) => {
                const copy = new Date(d.getTime());
                copy.setDate(copy.getDate() - days);
                return copy;
            };
            expect(func(date, 1).getTime()).toBe(subtractDaysFromDate(date, 1).getTime());
            expect(func(today, 1).getTime()).toBe(subtractDaysFromDate(today, 1).getTime());
            expect(func(futureDate, 1).getTime()).toBe(subtractDaysFromDate(futureDate, 1).getTime());
            expect(func(pastDate, 1).getTime()).toBe(subtractDaysFromDate(pastDate, 1).getTime());
            expect(func(date, 200).getTime()).toBe(subtractDaysFromDate(date, 200).getTime());
            expect(func(today, 200).getTime()).toBe(subtractDaysFromDate(today, 200).getTime());
            expect(func(futureDate, 200).getTime()).toBe(subtractDaysFromDate(futureDate, 200).getTime());
            expect(func(pastDate, 200).getTime()).toBe(subtractDaysFromDate(pastDate, 200).getTime());
        })
    });

});

const shouldGetTheBeginningOfTheDay = (func: (date: Date) => Date, date: Date) => {
    expect(func(date).getHours()).toBe(0);
    expect(func(date).getMinutes()).toBe(0);
    expect(func(date).getSeconds()).toBe(0);
    expect(func(date).getMilliseconds()).toBe(0);
};

const shouldMakeACopyOfTheDateObject = (func: (date: Date) => Date, date: Date) => {
    const copy = new Date(date);
    copy.setMilliseconds(10);
    expect(func(copy).getMilliseconds()).not.toBe(copy.getMilliseconds());
};
