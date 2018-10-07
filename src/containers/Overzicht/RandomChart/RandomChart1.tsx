import * as React from 'react';
import { ResponsivePieCanvas } from '@nivo/pie';

const randomChart1 = () => {
    const data = [
        {
            'id': 'javascript',
            'label': 'javascript',
            'value': 347,
            'color': 'hsl(353, 70%, 50%)'
        },
        {
            'id': 'css',
            'label': 'css',
            'value': 258,
            'color': 'hsl(165, 70%, 50%)'
        },
        {
            'id': 'elixir',
            'label': 'elixir',
            'value': 244,
            'color': 'hsl(84, 70%, 50%)'
        },
        {
            'id': 'lisp',
            'label': 'lisp',
            'value': 87,
            'color': 'hsl(109, 70%, 50%)'
        },
        {
            'id': 'scala',
            'label': 'scala',
            'value': 243,
            'color': 'hsl(201, 70%, 50%)'
        },
        {
            'id': 'erlang',
            'label': 'erlang',
            'value': 241,
            'color': 'hsl(104, 70%, 50%)'
        },
        {
            'id': 'hack',
            'label': 'hack',
            'value': 115,
            'color': 'hsl(254, 70%, 50%)'
        },
        {
            'id': 'stylus',
            'label': 'stylus',
            'value': 378,
            'color': 'hsl(324, 70%, 50%)'
        },
        {
            'id': 'haskell',
            'label': 'haskell',
            'value': 404,
            'color': 'hsl(121, 70%, 50%)'
        },
        {
            'id': 'java',
            'label': 'java',
            'value': 383,
            'color': 'hsl(308, 70%, 50%)'
        },
        {
            'id': 'rust',
            'label': 'rust',
            'value': 570,
            'color': 'hsl(289, 70%, 50%)'
        },
        {
            'id': 'php',
            'label': 'php',
            'value': 199,
            'color': 'hsl(159, 70%, 50%)'
        },
        {
            'id': 'sass',
            'label': 'sass',
            'value': 286,
            'color': 'hsl(349, 70%, 50%)'
        },
        {
            'id': 'python',
            'label': 'python',
            'value': 445,
            'color': 'hsl(10, 70%, 50%)'
        },
        {
            'id': 'ruby',
            'label': 'ruby',
            'value': 205,
            'color': 'hsl(234, 70%, 50%)'
        },
        {
            'id': 'go',
            'label': 'go',
            'value': 203,
            'color': 'hsl(229, 70%, 50%)'
        },
        {
            'id': 'c',
            'label': 'c',
            'value': 426,
            'color': 'hsl(299, 70%, 50%)'
        },
        {
            'id': 'make',
            'label': 'make',
            'value': 495,
            'color': 'hsl(146, 70%, 50%)'
        }
    ];

    return <ResponsivePieCanvas
        data={data}
        margin={{
            'top': 40,
            'right': 200,
            'bottom': 40,
            'left': 80
        }}
        pixelRatio={1}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors='paired'
        colorBy='id'
        borderColor='inherit:darker(0.6)'
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor='#333333'
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor='inherit'
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor='#333333'
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        // defs={[
        //     {
        //         'id': 'dots',
        //         'type': 'patternDots',
        //         'background': 'inherit',
        //         'color': 'rgba(255, 255, 255, 0.3)',
        //         'size': 4,
        //         'padding': 1,
        //         'stagger': true
        //     },
        //     {
        //         'id': 'lines',
        //         'type': 'patternLines',
        //         'background': 'inherit',
        //         'color': 'rgba(255, 255, 255, 0.3)',
        //         'rotation': -45,
        //         'lineWidth': 6,
        //         'spacing': 10
        //     }
        // ]}
        // fill={[
        //     {
        //         'match': {
        //             'id': 'ruby'
        //         },
        //         'id': 'dots'
        //     },
        //     {
        //         'match': {
        //             'id': 'c'
        //         },
        //         'id': 'dots'
        //     },
        //     {
        //         'match': {
        //             'id': 'go'
        //         },
        //         'id': 'dots'
        //     },
        //     {
        //         'match': {
        //             'id': 'python'
        //         },
        //         'id': 'dots'
        //     },
        //     {
        //         'match': {
        //             'id': 'scala'
        //         },
        //         'id': 'lines'
        //     },
        //     {
        //         'match': {
        //             'id': 'lisp'
        //         },
        //         'id': 'lines'
        //     },
        //     {
        //         'match': {
        //             'id': 'elixir'
        //         },
        //         'id': 'lines'
        //     },
        //     {
        //         'match': {
        //             'id': 'javascript'
        //         },
        //         'id': 'lines'
        //     }
        // ]}
        legends={[
            {
                'anchor': 'right',
                'direction': 'column',
                'translateX': 140,
                'itemWidth': 60,
                'itemHeight': 14,
                'itemsSpacing': 2,
                'symbolSize': 14,
                'symbolShape': 'circle'
            }
        ]}
    />
};

export default randomChart1;
