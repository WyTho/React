import store from '../../store/initialize';
import {
    addDays,
    epochTimestamp,
    getDateRangeOfTwoMonthsAround,
    IDateRange,
    subtractDays
} from '../date/date';
import {IApiGraph} from './dataTypes';

export enum DataSet {
    AVERAGE_TEMPERATURE = 'AVERAGE_TEMPERATURE',
    AVERAGE_WATER_USAGE = 'AVERAGE_WATER_USAGE',
}

export const getAllDatasets = (): DataSet[] => {
    return Object.keys(DataSet) as DataSet[];
};

export const getMissingDataRange = (centerDate: Date): null | IDateRange => {
    const { fromDate, toDate } = getDateRangeOfTwoMonthsAround(centerDate);
    const neededFromTimestamp = epochTimestamp(fromDate);
    const neededToTimestamp = epochTimestamp(toDate);

    const datasets = store.getState().data.dataset;

    // TODO: check all datasets if data is missing instead of just the first
    const data: IApiGraph = datasets[getAllDatasets()[0]];

    if (data) {
        const firstTimestampInDataset = data.weeks[0].days[0].timestamp;
        const lastTimestampInDataset = data.weeks[data.weeks.length - 1].days[6].timestamp;

        const firstDate = subtractDays(new Date(firstTimestampInDataset * 1000), 1);

        const lastDate = addDays(new Date(lastTimestampInDataset * 1000), 1);

        if (neededFromTimestamp < firstTimestampInDataset) {
            return { fromDate, toDate: firstDate };
        } else if (neededToTimestamp > lastTimestampInDataset) {
            return { fromDate: lastDate, toDate };
        }
    }
    return null;
};
