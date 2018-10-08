import {List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Paper, Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import Modal from '../../UI/Modal/Modal';
import './Overzicht.scss';

import ChartDingus from './chart';

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
                <Typography variant='display2'>
                    Overzicht
                </Typography>
                <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='stretch'
                    spacing={24}
                >
                    <Grid item md={4} sm={6} xs={12}>
                        <Paper style={{ height: '100%', width: '100%' }} elevation={3}>
                            <ChartDingus/>
                        </Paper>
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <Paper style={{ height: '100%', width: '100%' }} elevation={3}>
                            <ChartDingus/>
                        </Paper>
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <Paper style={{ height: '100%', width: '100%' }} elevation={3}>
                            <ChartDingus/>
                        </Paper>
                    </Grid>
                    <Grid item md={4} sm={6} xs={12}>
                        <button style={{ height: '100%', width: '100%' }} onClick={this.openModalHandler}>Open Modal</button>
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
