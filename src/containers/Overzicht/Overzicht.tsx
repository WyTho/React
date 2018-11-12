import {
    Typography,
    Grid,
    Button,
    Icon,
    IconButton
} from '@material-ui/core';
import * as React from 'react';
import Modal from '../../components/Modal/Modal';
import ChartForKlimaatbeheer from './ChartForKlimaatbeheer/ChartForKlimaatbeheer'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import {beautifyDate, getBeginningOfTheDay, getDisplayName, getNextDate, getPreviousDate, IDateRange} from '../../utils/date/date';
import {TimeSpan} from '../../utils/date/dateTypes';
import {DataSet, getAllDatasets, getMissingDataRange} from '../../utils/data/apiGraph';
import ChartForWaterUsage from './ChartForWaterUsage/ChartForWaterUsage';
import Loading from '../../components/Loading/Loading';
import StatusForLights from './StatusForLights/StatusForLights';

interface IState {
    modalOpened: boolean
    modalData: {
        title: string
        date: Date
        value: number | string
    }
}
interface IProps {
    selected: {
        timeSpan: TimeSpan
        graphStartDateTime: Date
        currentDateTime: Date
    },
    loading: {
        initial: boolean
        partial: boolean
    },
    error: {
        status: boolean
        error: Error
        message: string
    },
    setTimeSpan: (timeSpan: TimeSpan) => void
    setStartDate: (date: Date) => void
    fetchApiGraphData: (typeOfData: DataSet[], centerDate: Date, initialLoad: boolean) => void
    fetchApiItemsData: () => void
}

export class Overzicht extends React.Component<IProps, IState> {
    public state = {
        modalOpened: false,
        modalData: {
            title: null as string,
            date: null as Date,
            value: null as number | string
        }
    };

    public componentDidMount() {
        this.props.fetchApiGraphData(getAllDatasets(), this.props.selected.graphStartDateTime, true);
        this.props.fetchApiItemsData()
    }

    public render() {
        const { props, props: { selected: { timeSpan, graphStartDateTime }, loading, error } } = this;

        const isLoading = loading.initial || loading.partial;
        const hasError = error.status;

        return (
            <div className='Overzicht'>
                <div className={'titleContainer'}>
                    <Typography variant='h3' gutterBottom>
                        Overzicht
                    </Typography>
                    <div className='buttonContainer'>

                        <div className={'circularButtonWrapper'}>
                            <IconButton onClick={() => props.setStartDate(getPreviousDate(timeSpan, graphStartDateTime))}
                                        disabled={isLoading || hasError}>
                                <Icon>chevron_left</Icon>
                            </IconButton>
                            { isLoading ? <Loading type='spinner' size={60} className='circularButtonLoader' thickness={0.2} /> : null }
                        </div>

                        <Button color='primary' onClick={() => props.setStartDate(getBeginningOfTheDay(new Date()))}
                                disabled={isLoading || hasError}>
                            { getDisplayName(timeSpan, graphStartDateTime) }
                        </Button>

                        <div className={'circularButtonWrapper'}>
                            <IconButton onClick={() => props.setStartDate(getNextDate(timeSpan, graphStartDateTime))}
                                        disabled={isLoading || hasError}>
                                <Icon>chevron_right</Icon>
                            </IconButton>
                            { isLoading ? <Loading type='spinner' size={60} className='circularButtonLoader' thickness={0.2} /> : null }
                        </div>

                    </div>
                    <div className='buttonContainer'>
                        <Button className={'timeToggleButton'}
                                variant={timeSpan === TimeSpan.month ? 'contained' : 'text'}
                                onClick={() => {
                                    props.setTimeSpan(TimeSpan.month);
                                    props.setStartDate(graphStartDateTime);
                                }}
                                size='small'
                                color='primary'>
                            Maand
                        </Button>
                        <Button className={'timeToggleButton'}
                                variant={timeSpan === TimeSpan.week ? 'contained' : 'text'}
                                onClick={() => {
                                    props.setTimeSpan(TimeSpan.week);
                                    props.setStartDate(graphStartDateTime);
                                }}
                                size='small'
                                color='primary'>
                            Week
                        </Button>
                        <Button className={'timeToggleButton'}
                                variant={timeSpan === TimeSpan.day ? 'contained' : 'text'}
                                onClick={() => {
                                    props.setTimeSpan(TimeSpan.day);
                                    props.setStartDate(graphStartDateTime);
                                }}
                                size='small'
                                color='primary'>
                            Dag
                        </Button>
                    </div>
                </div>
                <Grid
                    className={'GridContainer'}
                    container
                    direction='row'
                    justify='center'
                    alignItems='stretch'
                    spacing={24}>
                    <Grid className={'GridItem'} item md={8} sm={12} xs={12}>
                        <ChartForKlimaatbeheer fetchApiGraphData={props.fetchApiGraphData} openModal={this.openModalHandler} />
                    </Grid>
                    <Grid className={'GridItem'} item md={4} sm={6} xs={12}>
                        <ChartForWaterUsage fetchApiGraphData={props.fetchApiGraphData} openModal={this.openModalHandler} />
                    </Grid>
                    <Grid className={'GridItem'} item md={3} sm={6} xs={12}>
                        <StatusForLights fetchApiItemsData={props.fetchApiItemsData} openModal={this.openModalHandler} />
                    </Grid>
                    <Grid className={'GridItem'} item md={3} sm={6} xs={12}>
3
                    </Grid>
                    <Grid className={'GridItem'} item md={6} sm={12} xs={12}>
6
                    </Grid>

                </Grid>
                {this.modalJSX()}
            </div>
        )
    }

    private openModalHandler = (title: string, date: Date, value: number) => {
        this.setState({
            modalOpened: true,
            modalData: {
                title,
                date,
                value
            }
        })
    };

    private modalJSX = () => {
        const { modalOpened, modalData: { title, date, value } } = this.state;
        return (
            <Modal title={title ? title : 'Loading...'}
                   opened={modalOpened}
                   onClosed={() => this.setState({
                       modalOpened: false,
                       modalData: {
                           title: null as string,
                           date: null as Date,
                           value: null as number | string
                       }
                   } )}>
                <div style={{ margin: 24 }}>
                    <Typography variant='overline'>
                        {date ? beautifyDate(date, `De ${title.toLowerCase()} op {WEEK_DAY} {DAY} {MONTH} {YEAR} om {TIME} is`) : null}
                    </Typography>
                    <Typography variant='h3'>
                        {value ? value : null}
                    </Typography>
                </div>
            </Modal>
        );
    }

}
const mapStateToProps = (state: any) => {
    const { selected, loading, error } = state.data;
    return { selected, loading, error }
};
const mapDispatchToProps = (dispatch: any): Partial<IProps> => ({
    setTimeSpan: (timeSpan: TimeSpan) => dispatch(actions.setTimeSpanForGraphs(timeSpan)),
    setStartDate: (date: Date) => {
        dispatch(actions.setCurrentDate());
        dispatch(actions.setStartDateForGraphs(date));
        const missingData: null | IDateRange = getMissingDataRange(date);
        if (missingData) {
            dispatch(actions.fetchDataInRange(getAllDatasets(), missingData.fromDate, missingData.toDate));
        }
    },
    fetchApiGraphData: (typeOfData: DataSet[], centerDate: Date, initial: boolean) =>
        dispatch(actions.fetchApiGraphData(typeOfData, centerDate, initial)),
    fetchApiItemsData: () => dispatch(actions.fetchApiItemsData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Overzicht);
