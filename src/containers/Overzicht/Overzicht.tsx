import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import Modal from '../../UI/Modal/Modal';
import ChartForKlimaatbeheer from './ChartForKlimaatbeheer/ChartForKlimaatbeheer'

import { connect } from 'react-redux';

interface IState {
    modalOpened: boolean
}
// interface IProps {
//     theme: Theme
// }

export class Overzicht extends React.Component<{}, IState> {
    public state = {
        modalOpened: false
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
                    spacing={24}>
                    <Grid className={'GridItem'} item md={8} sm={12} xs={12}>
                        <ChartForKlimaatbeheer/>
                    </Grid>
                    <Grid className={'GridItem'} item md={4} sm={6} xs={12}>
                        <ChartForKlimaatbeheer/>
                    </Grid>
                    <Grid className={'GridItem'} item md={4} sm={6} xs={12}>
                        <ChartForKlimaatbeheer/>
                    </Grid>
                    <Grid className={'GridItem'} item md={8} sm={12} xs={12}>
                        <ChartForKlimaatbeheer/>
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
        this.setState({ modalOpened: true } )
    };

    private modalJSX = () => (
        <Modal title={'Hello planet!'}
               opened={this.state.modalOpened}
               onClosed={() => this.setState({ modalOpened: false } )}>
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
// const mapStateToProps = (state: any) => {
//     const { theme } = state.theme;
//     return { theme }
// };
export default Overzicht; // connect(mapStateToProps)(Overzicht);
