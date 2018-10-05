import {List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Icon} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import Modal from '../../UI/Modal/Modal';
import './Overview.scss';

interface IState {
    modal: {
        opened: boolean
    }
}

export class Overview extends React.Component<{}, IState> {
    public state = {
        modal: {
            opened: false
        }
    };

    public render() {

        return (
            <div className='Overview'>
                <button onClick={this.openModalHandler}>Open Modal</button>
                <Icon>add_circle</Icon>
                <Typography variant="srOnly">Create a user</Typography>
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

export default Overview;
