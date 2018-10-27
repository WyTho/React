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
             * Timestamps from the backend are in ISO-format, this means milliseconds are excluded
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

// TODO: add all possible chart options
export interface IChartOptions {
    maintainAspectRatio?: boolean,
    responsive?: boolean,
    showLines?: boolean,
    legend?: {
        display?: boolean
    },
    elements?: {
        line?: {},
        point?: {
            radius?: number,
            hitRadius?: number
        }
    },
    scales?: {
        yAxes?: IChartOptionsAxis[],
        xAxes?: IChartOptionsAxis[]
    },
    tooltips?: {
        caretPadding?: number,
        displayColors?: boolean,
        backgroundColor?: string,
        borderColor?: string,
        borderWidth?: number,
        color?: string,
        bodySpacing?: number,
        callbacks?: {
            title?: (tooltipItems: any[], dataAndLabels: any) => any,
            label?: (value: any, context: any) => any
        }
    } & IChartOptionsTooltipStyle,

    // plugins
    annotation?: {
        annotations?: IAnnotation[]
    }
    plugins?: {
        datalabels?: IChartOptionsDatalabels
    }
}
export interface IChartData {
    labels: any[],
    datasets: IChartDataset[]
}

interface IChartOptionsAxis {
    display?: boolean,
    gridLines?: {
        display?: boolean
    },
    ticks?: {
        beginAtZero?: boolean
    }
}

interface IChartOptionsDatalabels {
    display?: boolean | ((context: any) => boolean),
    align?: string,
    formatter?: ((value: any, context?: any) => any),
    borderRadius?: number,
    color?: string,
    opacity?: (context: any) => number
}

interface IChartOptionsTooltipStyle {
    bevelWidth?: number,
    bevelHighlightColor?: string,
    bevelShadowColor?: string,
    shadowOffsetX?: number,
    shadowOffsetY?: number,
    shadowBlur?: number,
    shadowColor?: string,
    innerGlowWidth?: number,
    innerGlowColor?: string,
    outerGlowWidth?: number,
    outerGlowColor?: string,
}

// TODO: add all possible chart dataset options
interface IChartDataset {
    label?: string,
    data?: any[],
    borderColor?: string,
    fill?: boolean,
    backgroundColor?: string,
    datalabels?: IChartDatasetDatalabels
}

interface IChartDatasetDatalabels {
    backgroundColor?: string,
    listeners?: {
        click?: (context: any) => any
    }
}
