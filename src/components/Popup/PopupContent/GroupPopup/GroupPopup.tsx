import * as React from 'react';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';
import {Button, Icon, IconButton, TextField, Tooltip, Typography} from '@material-ui/core';
import {IApiGroup, IApiItem, IApiItemCompact} from '../../../../utils/data/dataTypes';
import {ChangeEvent, FormEvent} from 'react';

export interface IGroupPopupState {
    name: string
    items: IApiItemCompact[]
}

export class GroupPopup extends React.Component<IPassedPopupContentProps & IReduxPopupContentProps, IGroupPopupState> {
    public state = {
        name: '',
        items: [] as IApiItemCompact[]
    };

    public componentDidMount() {
        const group = this.props.popup.data as IApiGroup;
        if (group) {
            this.setState({
                name: group.name
            });
            if (group.items) {
                this.setState({
                    items: group.items
                });
            }
        }
    }

    public render() {
        const { props, props: { popup, items } } = this;

        const group: IApiGroup = popup.data as IApiGroup;

        // get a live copy from redux
        const groupItems: IApiItem[] = !group || !items ? [] : items.filter((i: IApiItem) => i.groups.find(g => g.id === group.id));

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
                items: this.state.items
            };
            props.addGroup(newGroup);
            props.popPopup()
        };

        return (
            <div className='popupContent group'>
                <form autoComplete='off' onSubmit={group ? group.id ? editGroupHandler : addGroupHandler : addGroupHandler}>
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
                            {groupItems.map(item => (
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
                        <Button className='ml' type='submit' variant='contained' color='primary'>{group ? group.id ? 'Wijzigen' : 'Aanmaken' : 'Aanmaken'}</Button>
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
