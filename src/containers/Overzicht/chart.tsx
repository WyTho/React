import * as React from 'react';
import {ChartData, Line} from 'react-chartjs-2';

const data: ChartData<any> = {
    labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    datasets: [{
        data: [
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 300),
            Math.floor(Math.random() * 300)
        ],
        label: 'Africa',
        borderColor: '#3e95cd',
        fill: true,
        backgroundColor: '#3e95cd'
    }]
};

const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    showLines : true,
    // plugins: {
    //     filler: {
    //         propagate: true
    //     }
    // },
    scales : {
        yAxes : [{ display: false }],
        xAxes : [{ display: false }]
    },
    legend: {
        display: false,
        // labels: {
        //     fontColor: 'red'
        // }
    },
    elements : {
        line : {
            // tension: 100,
            // borderWidth: 0.1,
        },
        point : {
            radius: 0,
            // borderWidth: 0
        }
    }
};

const x = () => <Line
    data = {data}
    options={chartOptions}
/>;

export default x;
