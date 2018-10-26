import * as React from 'react';
import { Typography } from '@material-ui/core';

export class Toezicht extends React.Component<{}, {}> {

    public render() {

        return (
            <div className='Toezicht'>
                <Typography variant='h3'>
                    Toezicht
                </Typography>
            </div>
        )
    }
}

export default Toezicht;
