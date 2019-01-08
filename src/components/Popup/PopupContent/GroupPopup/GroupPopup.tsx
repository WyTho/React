import * as React from 'react';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';
import {Button, Icon, IconButton, TextField, Tooltip, Typography} from '@material-ui/core';
import {IApiGroup} from '../../../../utils/data/dataTypes';
import {ChangeEvent, FormEvent} from 'react';

export interface IGroupPopupState {
    name: string
}

export class GroupPopup extends React.Component<IPassedPopupContentProps & IReduxPopupContentProps, IGroupPopupState> {
    public state = {
        name: ''
    };

    public componentDidMount() {
        const group = this.props.popup.data as IApiGroup;
        if (group) {
            this.setState({
                name: group.name
            })
        }
    }

    public render() {
        const { props, props: { popup } } = this;

        const group: IApiGroup = popup.data as IApiGroup;

        const editGroupHandler = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const {id, ...restOfTheGroupProps} = group;
            const editedGroup: IApiGroup = {
                ...restOfTheGroupProps,
                name: this.state.name
            };
            props.editGroup(id, editedGroup);
            props.popPopup()
        };
        const addGroupHandler = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const newGroup: IApiGroup = {
                name: this.state.name,
                is_module: false,
                items: []
            };
            props.addGroup(newGroup);
            props.popPopup()
        };

        return (
            <div className='popupContent group'>
                <form autoComplete='off' onSubmit={group ? editGroupHandler : addGroupHandler}>
                    <div className='inputWrapper'>
                        <TextField
                            id='nameInput'
                            label='Naam'
                            value={this.state.name} onChange={this.handleNameChange.bind(this)}
                            required
                        />
                    </div>
                    {group ? (
                        <div>
                            {group.items.map(item => (
                                <Typography key={`group-item-${item.id}`} variant='caption'>
                                    <Tooltip title={`'${item.name}' verwijderen van deze groep`} aria-label='Verwijderen'>
                                        <IconButton className='mr'
                                                    aria-label='Remove'
                                                    onClick={() => props.removeItemFromGroup(item.id, group.id)}
                                                    color='secondary'>
                                            <Icon>remove</Icon>
                                        </IconButton>
                                    </Tooltip>
                                    <span>{item.name}</span>
                                </Typography>
                            ))}
                        </div>
                    ) : null}
                    <div className='flexRight'>
                        <Button className='ml' type='submit' variant='contained' color='primary'>{group ? 'Wijzigen' : 'Aanmaken'}</Button>
                        <Button className='ml' onClick={props.popPopup}>Annuleren</Button>
                    </div>
                </form>
            </div>
        );
    }

    public handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.target.value
        })
    }
}

export default GroupPopup;
