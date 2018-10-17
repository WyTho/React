import * as React from 'react';
import { CircularProgress, LinearProgress } from '@material-ui/core';

interface IProps {
    type?: string,
    color?: any,
    size?: number
}

const defaults = {
    type: 'spinner',
    color: 'primary',
    size: 50
};

const loading = (props: IProps) => {
    let { type, color, size } = props;

    type = type ? type : defaults.type;
    color = color ? color : defaults.color;
    size = size ? size : defaults.size;

    switch (type) {
        case 'spinner': return <CircularProgress color={ color } size={size} />;
        case 'bar': return <LinearProgress />;
    }

};

export default loading;
