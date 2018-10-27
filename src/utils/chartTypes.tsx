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
             * This is how you convert it to a Javascript date:    new Date(timestamp * 1numbernumbernumber)
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
        yAxes?: IChartAxis[],
        xAxes?: IChartAxis[]
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
    } & IChartTooltipStyle,

    // plugins
    annotation?: {
        annotations?: IAnnotation[]
    }
    plugins?: {
        datalabels?: IChartDatalabels
    }
}

interface IChartAxis {
    display?: boolean,
    gridLines?: {
        display?: boolean
    },
    ticks?: {
        beginAtZero?: boolean
    }
}

interface IChartDatalabels {
    display?: boolean | ((context: any) => boolean),
    align?: string,
    formatter?: ((value: any, context?: any) => any),
    borderRadius?: number,
    color?: string,
    opacity?: (context: any) => number
}

interface IChartTooltipStyle {
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
