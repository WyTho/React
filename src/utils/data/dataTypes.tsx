/**
 * [ 1 ] BE AWARE
 *   |-- Timestamps from the backend are in ISO-format, this means milliseconds are excluded
 *   |-- This is how you convert it to a Javascript date:    new Date(timestamp * 1000)
 */

/**
 * The Chart-data from the Python backend had the following format
 */
export interface IApiGraph {
    id: number
    data_type: string
    title: string
    weeks: Array<{
        days: Array<{
            id: number
            timestamp: number // [ 1 ] BE AWARE
            values: any[]
        }>
    }>
}

/**
 * The Item (device information) data has the following structure
 */
export interface IApiItem {
    id: number
    name: string
    address: string
    comment: string
    last_use: {
        last_used: number, // [ 1 ] BE AWARE
        last_use: {
            datatype: string
            data: any
        }
    },
    usages: IApiItemUsage[],
    groups: IApiItemGroup[],
}
export interface IApiItemUsage {
    id: number
    item_id: number
    usage_type: string
    usage: number
}
export interface IApiItemGroup {
    id: number
    name: string
}
