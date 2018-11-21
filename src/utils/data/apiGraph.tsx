import store from '../../store/initialize';
import {
    addDays,
    epochTimestamp,
    getDateRangeOfSixtyDaysAround,
    IDateRange,
    subtractDays
} from '../date/date';
import {IApiGraph} from './dataTypes';

export enum DataSet {
    AVERAGE_TEMPERATURE = 'AVERAGE_TEMPERATURE',
    AVERAGE_WATER_USAGE = 'AVERAGE_WATER_USAGE',
}

export const getAllDatasets = (): DataSet[] => {
    return Object.keys(DataSet).map(k => DataSet[k as any]) as DataSet[];
};

export const getMissingDataRange = (centerDate: Date): null | IDateRange => {
    const { fromDate, toDate } = getDateRangeOfSixtyDaysAround(centerDate);
    const neededFromTimestamp = epochTimestamp(fromDate);
    const neededToTimestamp = epochTimestamp(toDate);

    const datasets = store.getState().data.dataset;

    interface ITimestampRangeInDataset {
        first: number
        last: number
    }

    const timestampRangeInDataset: ITimestampRangeInDataset = getAllDatasets().reduce(
        (timestamps: ITimestampRangeInDataset, dataset: DataSet) => {
            const data: IApiGraph = datasets[dataset];
            if (data) {
                const firstTimestampInDataset = data.weeks[0].days[0].timestamp;
                const lastTimestampInDataset = data.weeks[data.weeks.length - 1].days[6].timestamp;

                let first;
                if (!timestamps.first) {
                    first = firstTimestampInDataset;
                } else {
                    first = firstTimestampInDataset < timestamps.first ? firstTimestampInDataset : timestamps.first;
                }

                let last;
                if (!timestamps.last) {
                    last = lastTimestampInDataset;
                } else {
                    last = lastTimestampInDataset   > timestamps.last  ? lastTimestampInDataset  : timestamps.last;
                }

                return { first, last }
            }
            return timestamps;
        },
        { first: null, last: null }
    );

    const firstDate = subtractDays(new Date(timestampRangeInDataset.first * 1000), 1);
    const lastDate = addDays(new Date(timestampRangeInDataset.last * 1000), 1);

    if (neededFromTimestamp < timestampRangeInDataset.first) {
        return { fromDate, toDate: firstDate };
    } else if (neededToTimestamp > timestampRangeInDataset.last) {
        return { fromDate: lastDate, toDate };
    }

    return null;
};
