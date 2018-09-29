import { Grid, Paper, Tooltip, Typography } from '@material-ui/core';
import * as React from 'react';

interface IProps {
    name: string
}

export class App extends React.Component<IProps, {}> {
    public render() {

        const testStyle = { marginTop: 20, padding: 20, cursor: 'pointer' };
        const testHandler = () => alert('awesome');

        return (
            <Grid container spacing={16} justify='center'>
                <Grid item xs={6}>
                    <Tooltip title='This works!'>
                        <Paper elevation={1} style={testStyle} onClick={testHandler}>
                            <Typography variant='headline' component='h3'>
                                Hello, {this.props.name}!
                            </Typography>
                            <Typography component='p'>
                                This is a sheet of paper.
                            </Typography>
                        </Paper>
                    </Tooltip>
                </Grid>
            </Grid>
        )
    }
}
