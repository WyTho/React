import * as React from 'react';
import Chart from 'react-apexcharts';

const x = () => <Chart
    options={{
        chart: {
            id: 'basic-bar'
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    }}
    series={[
        {
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
    ]}
    type='bar'
    height={'100%'}
/>;

export default x;
