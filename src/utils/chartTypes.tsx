
export interface ICharDataset {
    label: string,
    values: any[],
    borderColor: string,
    backgroundColor: string,
    dataLabelBackgroundColor: string,
    clickHandler: (context: any) => any
}

/**
 * For /utils/chartData => createChartOptions()
 */
export enum DataLabelsDisplay {
    All_EXCEPT_FIRST_AND_LAST = 'All_EXCEPT_FIRST_AND_LAST',
    NONE = 'NONE'
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
        color?: string,
        displayLabels?: DataLabelsDisplay
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
