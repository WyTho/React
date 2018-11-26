
export enum DataSet {
    AVERAGE_TEMPERATURE = 'AVERAGE_TEMPERATURE',
    AVERAGE_WATER_USAGE = 'AVERAGE_WATER_USAGE',
}

export const getAllDatasets = (): DataSet[] => {
    return Object.keys(DataSet).map(k => DataSet[k as any]) as DataSet[];
};
