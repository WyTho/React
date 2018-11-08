import * as React from 'react';
import { CircularProgress, LinearProgress } from '@material-ui/core';

interface IProps {
    type?: string
    color?: any
    size?: number
    style?: any
    className?: any
    thickness?: number
    value?: number,
    variant?: any
}

const defaults = {
    type: 'spinner',
    color: 'primary'
};

const loading = (props: IProps) => {
    let { type, color } = props;

    type  = type  ? type  : defaults.type;
    color = color ? color : defaults.color;

    switch (type) {
        case 'spinner': return <CircularProgress {...props} />;
        case 'bar': return <LinearProgress {...props} />;
    }

};

export default loading;
