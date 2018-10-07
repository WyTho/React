import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import Modal from '../../UI/Modal/Modal';
import './Overzicht.scss';
import RandomChart1 from './RandomChart/RandomChart1'

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

                <Paper style={{height: 540, width: 960, margin: 64, padding: 64}} elevation={24}>
                    <Typography variant='headline'>
                        Test chart ding
                    </Typography>
                    <RandomChart1/>
                </Paper>

                <button onClick={this.openModalHandler}>Open Modal</button>
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
