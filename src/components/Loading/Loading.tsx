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
    type: 'spinner'
};

const loading = (props: IProps) => {
    let { type } = props;

    type = type ? type : defaults.type;

    switch (type) {
        case 'spinner': return <CircularProgress {...props} />;
        case 'bar': return <LinearProgress {...props} />;
    }

};

export default loading;
