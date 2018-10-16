import {List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Paper, Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import Modal from '../../UI/Modal/Modal';

import ChartDingus from './chartJS';
import ChartDingus2 from './apexCharts';

interface IState {
    modal: {
        opened: boolean
    }
}

export class Overzicht extends React.Component<{}, IState> {
    public state = {
        modal: {
            opened: false
        }
    };

    public render() {

        return (
            <div className='Overzicht'>
                <Typography variant='display2' gutterBottom>
                    Overzicht
                </Typography>
                <Grid
                    className={'GridContainer'}
                    container
                    direction='row'
                    justify='center'
                    alignItems='stretch'
                    spacing={24}
                >
                    <Grid className={'GridItem'} item md={8} sm={12} xs={12}>
                        <Paper className='card' elevation={1}>
                            <ChartDingus2/>
                        </Paper>
                    </Grid>
                    <Grid className={'GridItem'} item md={4} sm={6} xs={12}>
                        <Paper className='card' elevation={1}>
                            <ChartDingus2/>
                        </Paper>
                    </Grid>
                    <Grid className={'GridItem'} item md={4} sm={6} xs={12}>
                        <Paper className='card' elevation={1}>
                            <ChartDingus/>
                        </Paper>
                    </Grid>
                    <Grid className={'GridItem'} item md={8} sm={12} xs={12}>
                        <Paper className='card' elevation={1}>
                            <ChartDingus/>
                        </Paper>
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
        this.setState({ modal: { opened: true } } )
    };

    private modalJSX = () => (
        <Modal title={'Hello planet!'}
               opened={this.state.modal.opened}
               onClosed={() => this.setState({ modal: { opened: false } } )}>
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

export default Overzicht;
