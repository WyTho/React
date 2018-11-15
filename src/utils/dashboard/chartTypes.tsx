import {ChartDataSets, ChartOptions, ChartTooltipOptions} from 'chart.js';

/**
 * ChartJS
 */
export interface IChartOptions extends ChartOptions {
    tooltips?: ChartTooltipOptions & IChartOptionsTooltipStyle,
    annotation?: {
        annotations?: IAnnotation[]
    }
    plugins?: {
        datalabels?: IChartOptionsDatalabels
    }
}
export interface IChartData {
    labels: Array<string | string[]>,
    datasets: Array<ChartDataSets & IChartDatasetDatalabels>
}

/**
 * Annotations plugin for ChartJS
 */
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

/**
 * Datalabels plugin for ChartJS
 */
interface IChartOptionsDatalabels {
    display?: boolean | ((context: any) => boolean),
    align?: string,
    formatter?: ((value: any, context?: any) => any),
    borderRadius?: number,
    color?: string,
    opacity?: (context: any) => number
}
interface IChartDatasetDatalabels {
    datalabels?: {
        backgroundColor?: string,
        listeners?: {
            click?: (context: any) => any
        }
    }
}

/**
 * More styles plugin for ChartJS
 */
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
