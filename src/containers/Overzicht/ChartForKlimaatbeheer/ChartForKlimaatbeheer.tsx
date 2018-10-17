import * as React from 'react';
import {ChartData, Line} from 'react-chartjs-2';
import ChartCard from '../../../components/ChartCard/ChartCard'
import {connect} from 'react-redux';
import {Theme, Typography} from '@material-ui/core';

interface IProps {
    theme: Theme
}

class ChartForKlimaatbeheer extends React.Component<IProps, {}> {
    public render() {
        const { theme } = this.props;

        const data: ChartData<any> = {
            labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
            datasets: [{
                data: [
                    Math.floor(Math.random() * 100),
                    Math.floor(Math.random() * 200),
                    Math.floor(Math.random() * 300),
                    Math.floor(Math.random() * 400),
                    Math.floor(Math.random() * 500),
                    Math.floor(Math.random() * 600),
                    Math.floor(Math.random() * 500),
                    Math.floor(Math.random() * 400),
                    Math.floor(Math.random() * 300),
                    Math.floor(Math.random() * 200)
                ],
                label: 'Africa',
                borderColor: theme.palette.primary.main,
                fill: true,
                backgroundColor: theme.palette.primary.main
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

        return (
            <ChartCard title={'Klimaatbeheer'}>
                <div className={'content'}>
                    <Typography>
                        hello, world!
                    </Typography>
                </div>
                <div className={'chartContainer'}>
                    <Line data = {data} options={chartOptions}/>
                </div>
            </ChartCard>
        );
    }
}
const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    return { theme }
};

const mapDispatchToProps = (dispatch: any): Partial<IProps> => ({
    // toggleThemeHandler: () => dispatch(actions.toggleTheme())
});

export default connect(mapStateToProps)(ChartForKlimaatbeheer);
