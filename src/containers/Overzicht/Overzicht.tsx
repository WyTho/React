import {
    Typography,
    Grid,
    Theme
} from '@material-ui/core';
import * as React from 'react';
import Popup from '../../components/Popup/Popup';
import ChartForKlimaatbeheer from './Tiles/ChartForKlimaatbeheer/ChartForKlimaatbeheer'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import {
    getDisplayDateForTimespan,
    IDateRange,
} from '../../utils/date/date';
import {TimeSpan} from '../../utils/date/dateTypes';
import {DataSet, getMissingDataRange} from '../../utils/data/apiGraph';
import ChartForWaterUsage from './Tiles/ChartForWaterUsage/ChartForWaterUsage';
import Loading from '../../components/Loading/Loading';
import StatusForLights from './Tiles/StatusForLights/StatusForLights';
import TimeButtons from './Navigation/TimeButtons/TimeButtons';
import TimeSpanButtons from './Navigation/TimeSpanButtons/TimeSpanButtons';
import {buildPopupJsxFor, PopupType} from '../../utils/popup/popup';
import StatusForOtherDevices from './Tiles/StatusForOtherDevices/StatusForOtherDevices';

interface IState {
    popupOpened: boolean
    popupData: {
        type: PopupType
        title: string
        data: any
    }
}
export interface IOverzichtProps {
    theme: Theme,
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
    fetchApiGraphData: (centerDate: Date, typeOfData?: DataSet[]) => void
    fetchApiItemsData: () => void
}

export class Overzicht extends React.Component<IOverzichtProps, IState> {
    public state = {
        popupOpened: false,
        popupData: {
            type: null as PopupType,
            title: null as string,
            data: null as any
        }
    };

    public componentDidMount() {
        if (this.props.loading.initial) {
            this.props.fetchApiGraphData(this.props.selected.graphStartDateTime);
            this.props.fetchApiItemsData()
        }
    }

    public render() {
        const { props, props: { selected: { timeSpan, graphStartDateTime }, loading } } = this;

        const isLoading = loading.initial || loading.partial;

        return (
            <div className='Overzicht'>
                <div className={'titleContainer'}>
                    <div className='titleAndTimeNavigation'>
                        <Typography variant='h3' gutterBottom>
                            Overzicht
                        </Typography>
                        <div>
                            <TimeButtons {...props}/>
                        </div>
                    </div>
                    <div>
                        <Typography variant='overline' gutterBottom>
                            { !isLoading ? getDisplayDateForTimespan(timeSpan, graphStartDateTime) : null }
                        </Typography>
                    </div>
                    <div>
                        <TimeSpanButtons {...props}/>
                    </div>
                </div>
                <Grid className={'GridContainer'}
                      container
                      direction='row'
                      justify='center'
                      alignItems='stretch'
                      spacing={24}>
                    <Grid className={'GridItem'} item md={8} sm={12} xs={12}>
                        <ChartForKlimaatbeheer fetchApiGraphData={props.fetchApiGraphData} openPopup={this.openPopupHandler} />
                    </Grid>
                    <Grid className={'GridItem'} item md={4} sm={6} xs={12}>
                        <ChartForWaterUsage fetchApiGraphData={props.fetchApiGraphData} openPopup={this.openPopupHandler} />
                    </Grid>
                    <Grid className={'GridItem'} item md={3} sm={6} xs={12}>
                        <StatusForLights fetchApiItemsData={props.fetchApiItemsData} openPopup={this.openPopupHandler} />
                    </Grid>
                    <Grid className={'GridItem'} item md={3} sm={6} xs={12}>
                        <StatusForOtherDevices fetchApiItemsData={props.fetchApiItemsData} openPopup={this.openPopupHandler} />
                    </Grid>
                    <Grid className={'GridItem'} item md={6} sm={12} xs={12}>
6
                    </Grid>

                </Grid>
                {this.popupJSX()}
            </div>
        )
    }

    private openPopupHandler = (type: PopupType, title: string, data: any) => {
        this.setState({
            popupOpened: true,
            popupData: {
                type,
                title,
                data
            }
        })
    };
    private closePopupHandler = () => {
        this.setState({
            popupOpened: false
        } )
    };

    private popupJSX = () => {
        const { popupOpened, popupData: { type, title, data } } = this.state;
        return (
            <Popup title={title ? title : 'Loading...'}
                   opened={popupOpened}
                   onClosed={this.closePopupHandler}>
                {buildPopupJsxFor(type, data, this.props.theme)}
            </Popup>
        );
    }

}
const mapStateToProps = (state: any) => {
    const { theme } = state.theme;
    const { selected, loading, error } = state.data;
    return { theme, selected, loading, error }
};
const mapDispatchToProps = (dispatch: any): Partial<IOverzichtProps> => ({
    setTimeSpan: (timeSpan: TimeSpan) => dispatch(actions.setTimeSpanForGraphs(timeSpan)),
    setStartDate: (date: Date) => {
        dispatch(actions.setCurrentDate());
        dispatch(actions.setStartDateForGraphs(date));
        const missingData: null | IDateRange = getMissingDataRange(date);
        if (missingData) {
            dispatch(actions.fetchDataInRange(missingData.fromDate, missingData.toDate));
        }
    },
    fetchApiGraphData: (centerDate: Date, typeOfData?: DataSet[]) =>
        dispatch(actions.fetchApiGraphData(centerDate, typeOfData)),
    fetchApiItemsData: () => dispatch(actions.fetchApiItemsData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Overzicht);
