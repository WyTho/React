import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Grid,
    Button,
    Icon,
    IconButton
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import Modal from '../../components/Modal/Modal';
import ChartForKlimaatbeheer from './ChartForKlimaatbeheer/ChartForKlimaatbeheer'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import {getBeginningOfTheDay, getDisplayName, getNextDate, getPreviousDate, IDateRange} from '../../utils/date/date';
import {TimeSpan} from '../../utils/date/dateTypes';
import {DataSet, getMissingDataRange} from '../../utils/data/data';

interface IState {
    modalOpened: boolean
}
interface IProps {
    selected: {
        timeSpan: TimeSpan,
        graphStartDateTime: Date
        currentDateTime: Date
    },
    setTimeSpan: (timeSpan: TimeSpan) => void,
    setStartDate: (date: Date) => void,
    fetchData: (typeOfData: DataSet, centerDate?: Date) => void,
}

export class Overzicht extends React.Component<IProps, IState> {
    public state = {
        modalOpened: false
    };

    public componentDidMount() {
        this.props.fetchData(DataSet.AVERAGE_TEMPERATURE, this.props.selected.graphStartDateTime);
    }

    public render() {
        const { props, props: { selected: { timeSpan, graphStartDateTime } } } = this;

        return (
            <div className='Overzicht'>
                <div className={'titleContainer'}>
                    <Typography variant='h3' gutterBottom>
                        Overzicht
                    </Typography>
                    <div className='buttonContainer'>
                        <IconButton onClick={() => props.setStartDate(getPreviousDate(timeSpan, graphStartDateTime))}>
                            <Icon>chevron_left</Icon>
                        </IconButton>
                        <Button color='primary' onClick={() => props.setStartDate(getBeginningOfTheDay(new Date()))}>
                            { getDisplayName(timeSpan, graphStartDateTime) }
                        </Button>
                        <IconButton onClick={() => props.setStartDate(getNextDate(timeSpan, graphStartDateTime))}>
                            <Icon>chevron_right</Icon>
                        </IconButton>
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
                        <ChartForKlimaatbeheer fetchData={props.fetchData}/>
                    </Grid>
                    <Grid className={'GridItem'} item md={4} sm={6} xs={12}>

                    </Grid>
                    <Grid className={'GridItem'} item md={4} sm={6} xs={12}>

                    </Grid>
                    <Grid className={'GridItem'} item md={8} sm={12} xs={12}>

                    </Grid>

                    <Grid className='Grid' item md={12} sm={12} xs={12}>
                        <button style={{ height: '100%', width: '100%' }}
                                onClick={this.openModalHandler}>
                            Open Modal
                        </button>
                    </Grid>

                </Grid>
                {this.modalJSX()}
            </div>
        )
    }

    private openModalHandler = () => {
        this.setState({ modalOpened: true } )
    };

    private modalJSX = () => (
        <Modal title={'Hello planet!'}
               opened={this.state.modalOpened}
               onClosed={() => this.setState({ modalOpened: false } )}>
            <div>
                <List>

                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='add nothing' />
                    </ListItem>

                </List>
            </div>
        </Modal>
    );

}
const mapStateToProps = (state: any) => {
    const { selected } = state.data;
    return { selected }
};
const mapDispatchToProps = (dispatch: any): Partial<IProps> => ({
    setTimeSpan: (timeSpan: TimeSpan) => dispatch(actions.setTimeSpanForGraphs(timeSpan)),
    setStartDate: (date: Date) => {
        dispatch(actions.setCurrentDate());
        dispatch(actions.setStartDateForGraphs(date));
        const missingData: null | IDateRange = getMissingDataRange(DataSet.AVERAGE_TEMPERATURE, date);
        if (missingData) {
            dispatch(actions.fetchDataInRange(DataSet.AVERAGE_TEMPERATURE, missingData.fromDate, missingData.toDate));
        }
    },
    fetchData: (typeOfData: DataSet, centerDate?: Date) => dispatch(actions.fetchData(typeOfData, centerDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(Overzicht);
