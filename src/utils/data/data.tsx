import store from '../../store/initialize';
import {
    addDays,
    epochTimestamp,
    getDateRangeOfTwoMonthsAround,
    IDateRange, subtractDays
} from '../date/date';
import {IData} from '../chart/chartTypes';

export enum DataSet {
    AVERAGE_TEMPERATURE = 'AVERAGE_TEMPERATURE'
}

// TODO: handle multiple DataSet[]
export const getMissingDataRange = (type: DataSet, centerDate: Date): null | IDateRange => {
    const { fromDate, toDate } = getDateRangeOfTwoMonthsAround(centerDate);
    const neededFromTimestamp = epochTimestamp(fromDate);
    const neededToTimestamp = epochTimestamp(toDate);

    const data: IData = store.getState().data[DataSet.AVERAGE_TEMPERATURE].data;

    if (data) {
        const firstTimestampInDataset = data.weeks[0].days[0].timestamp;
        const lastTimestampInDataset = data.weeks[data.weeks.length - 1].days[6].timestamp;

        // TODO: change to subtract only 1 day if backend bug is fixed
        const firstDate = subtractDays(new Date(firstTimestampInDataset * 1000), 8);

        const lastDate = addDays(new Date(lastTimestampInDataset * 1000), 1);

        if (neededFromTimestamp < firstTimestampInDataset) {
            return { fromDate, toDate: firstDate };
        } else if (neededToTimestamp > lastTimestampInDataset) {
            return { fromDate: lastDate, toDate };
        }
    }
    return null;
};
