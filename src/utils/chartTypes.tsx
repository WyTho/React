
export enum TypeOf {
    UNDEFINED = 'undefined',
    NUMBER = 'number',
    STRING = 'string',
    OBJECT = 'object',
    SYMBOL = 'symbol',
    BOOLEAN = 'boolean',
    BIG_INT = 'bigint',
    FUNCTION = 'function'
}

/**
 * The data from the Python backend had the following format
 */
export interface IData {
    id: number
    data_type: string
    title: string
    weeks: Array<{
        days: Array<{
            id: number
            /**
             * Timestamps from the backend are in ISO-format, this means milliseconds are excuded
             * This is how you convert it to a Javascript date:    new Date(timestamp * 1000)
             */
            timestamp: number
            values: any[]
        }>
    }>
}

export interface IAnnotation {
    type?: string,
    drawTime?: string,
    mode?: string,
    scaleID?: string,
    value?: any,
    borderColor?: string,
    borderWidth?: number,
    borderDash?: number[],
    label?: {
        backgroundColor?: string,
        position?: string,
        content?: string
    }
}

export interface IChartOptionsConfig {
    display?: {
        legend?: boolean,
        scaleX?: boolean,
        scaleY?: boolean,
        gridlinesX?: boolean,
        gridlinesY?: boolean,
        points?: boolean
    }
    tooltips?: {
        caretPadding?: number,
        displayColors?: boolean,
        backgroundColor?: string, // theme.palette.primary.dark
        borderColor?: string, // theme.palette.primary.dark
        color?: string // white
    },
    datalabels?: {
        align?: string | ((context: any) => string),
        borderRadius?: number,
        color?: string
    }
    reformat?: {
        datalabel?: (value: number, context: any) => string,
        tooltipTitle?: (tooltipItems: any[], dataAndLabels: any) => string,
        tooltipContent?: (tooltipItem: any, dataAndLabels: any) => string
    },
    annotations?: IAnnotation[],
    spacingBetweenAnnotationsAndData?: number,
    beginAtZero?: boolean
}
