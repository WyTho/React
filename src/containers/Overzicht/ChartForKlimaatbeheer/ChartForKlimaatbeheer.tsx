import * as React from 'react';
import {ChartData, Line} from 'react-chartjs-2';
import ChartCard from '../../../components/ChartCard/ChartCard'
import {connect} from 'react-redux';
import {Theme, Typography, Snackbar, Button} from '@material-ui/core';
import * as actions from '../../../store/actions'
import {GridLineOptions} from 'chart.js';

interface IProps {
    theme: Theme,
    fetchData: () => void,
    loading: boolean,
    data: any,
    error: boolean
}

class ChartForKlimaatbeheer extends React.Component<IProps, {}> {
    public render() {
        const { props, props: { theme, loading, data, error } } = this;
        // console.log('loading', loading);
        console.log('data', data);
        // console.log('error', error);
        const type = 'day';
        const labels: any[] = [];
        const values: any[] = [];
        if (data) {
            if (type === 'day') {
                for (let i = 0; i < data.data.weeks[0].days[0].values.length; i++) {
                    labels.push( new Date((data.data.weeks[0].days[0].timestamp + (i * 60 * 60)) * 1000) );
                    values.push( +data.data.weeks[0].days[0].values[i].toFixed() );
                }
                console.log(labels)
            }
        }

        const chartData: ChartData<any> = {
            labels,
            datasets: [
                {
                    data: values.map((value: any, i: number) => i + 4 <= values.length ? value : null ),
                    label: 'Gemiddelde temperatuur',
                    borderColor: theme.palette.primary.main,
                    fill: true,
                    backgroundColor: theme.palette.primary.light
                },
                {
                    data: values.map((value: any, i: number) => i + 4 >= values.length ? value : null ),
                    label: 'Voorspelde temperatuur',
                    borderColor: theme.palette.primary.light,
                    fill: false
                }
            ]
        };

        const chartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            showLines : true,
            scales : {
                yAxes : [{
                    display: false,
                    gridLines: {
                        display: false
                    }
                }],
                xAxes : [{
                    display: false,
                    position: 'top',
                    gridLines: {
                        display: true
                    },
                    scaleLabel: {
                        fontSize: 16,
                        display: true,
                        fontStyle: 'normal'
                    }
                }]
            },
            legend: {
                display: false,
            },
            elements : {
                line : {},
                point : {
                    radius: 0,
                }
            }
        };
        
        return (
            <ChartCard title={'Klimaatbeheer'}
                       loading={loading}
                       error={error}
                       chartData={chartData}
                       chartOptions={chartOptions}
                       onFetchData={props.fetchData}>
                hello, world!
            </ChartCard>
        );
    }
}
const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    const { loading, data, error } = state.data.temperature;
    return { theme, loading, data, error }
};

const mapDispatchToProps = (dispatch: any): Partial<IProps> => ({
    fetchData: () => dispatch(actions.fetchTemperature())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartForKlimaatbeheer);
