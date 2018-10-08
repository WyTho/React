import * as React from 'react';
import {Doughnut, Line} from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
    }]
};

const chartOptions = {
    maintainAspectRatio: false
};

const x = () =>         < Line
    data={data}
    options={chartOptions}
    height={500}
    width={700}
/>;

export default x;
