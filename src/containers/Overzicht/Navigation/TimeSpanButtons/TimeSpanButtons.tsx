import * as React from 'react';
import {IOverzichtProps} from '../../Overzicht';
import {TimeSpan} from '../../../../utils/date/dateTypes';
import {Button} from '@material-ui/core';

const timeSpanButtons = (props: IOverzichtProps) => {
    const { selected: { timeSpan, graphStartDateTime } } = props;

    return (
        <>
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
        </>
    );
};

export default timeSpanButtons;
