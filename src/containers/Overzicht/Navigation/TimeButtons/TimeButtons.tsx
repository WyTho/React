import * as React from 'react';
import {
    chartIsAtCurrentTimespan,
    getBeginningOfTheDay,
    getCurrentTimespanDisplayDate, getCurrentTimespanDisplayName,
    getNextDate,
    getPreviousDate,
    getTimespanTooltip
} from '../../../../utils/date/date';
import {IOverzichtProps} from '../../Overzicht';
import {Button, Icon, IconButton, Tooltip} from '@material-ui/core';
import Loading from '../../../../components/Loading/Loading';

const timeButtons = (props: IOverzichtProps) => {
    const { selected: { timeSpan, graphStartDateTime }, loading, error } = props;

    const graphDateIsCurrentDate = chartIsAtCurrentTimespan(timeSpan, graphStartDateTime);
    const isLoading = loading.initial || loading.partial;
    const hasError = error.status;

    return (
        <>
            <Tooltip title={'Vorige ' + getTimespanTooltip(timeSpan)} placement='bottom'>
                <div>
                    <IconButton onClick={() => props.setStartDate(getPreviousDate(timeSpan, graphStartDateTime))}
                                disabled={isLoading || hasError}>
                        <Icon>chevron_left</Icon>
                    </IconButton>
                </div>
            </Tooltip>
            <Tooltip title={'Volgende ' + getTimespanTooltip(timeSpan)} placement='bottom'>
                <div>
                    <IconButton onClick={() => props.setStartDate(getNextDate(timeSpan, graphStartDateTime))}
                                disabled={isLoading || hasError}>
                        <Icon>chevron_right</Icon>
                    </IconButton>
                </div>
            </Tooltip>
            <Tooltip title={ getCurrentTimespanDisplayDate(timeSpan) } placement='bottom'>
                <div>
                    <Button color='primary'
                            variant='contained'
                            onClick={() => props.setStartDate(getBeginningOfTheDay(new Date()))}
                            disabled={isLoading || hasError || graphDateIsCurrentDate}>
                        { getCurrentTimespanDisplayName(timeSpan) }
                    </Button>
                </div>
            </Tooltip>
            <Tooltip title='Kies een datum' placement='bottom'>
                <div>
                    <IconButton onClick={() => alert('calender not implemented yet')}
                                disabled={isLoading || hasError}>
                        <Icon>calendar_today</Icon>
                    </IconButton>
                </div>
            </Tooltip>
            { isLoading ? <div className='loadingContainer'><Loading type='spinner' size={24} /></div> : null }

        </>
    );
};

export default timeButtons;
