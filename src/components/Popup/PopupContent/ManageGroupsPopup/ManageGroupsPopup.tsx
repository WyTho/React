import * as React from 'react';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';
import Loading from '../../../../components/Loading/Loading'
import {Button, Icon, IconButton, Tooltip, Typography} from '@material-ui/core';

const manageGroupsPopup = (props: IPassedPopupContentProps & IReduxPopupContentProps) => {
    const { popup, groups } = props;

    const removeGroupHandler = (groupId: number) => {
        // props.addItemToGroup(item.id, groupId)
        alert('remove group' + groupId)
    };
    const editGroupHandler = (groupId: number) => {
        // props.addItemToGroup(item.id, groupId)
        alert('edit group' + groupId)
    };
    const addGroupHandler = () => {
        // props.addItemToGroup(item.id, groupId)
        alert('add group')
    };

    let content = <div className='absoluteFlexContainer'><Loading /></div>;
    if (groups) {
        content = (
            <div className='popupContent manageGroups'>
                <Button variant='contained'
                        onClick={addGroupHandler}
                        color='primary'
                        style={{ marginBottom: 24, float: 'right' }}>
                    Nieuwe groep toevoegen
                </Button>
                {!groups.length ?
                    (
                        <span>nog geen groepen!</span>
                    ) : (
                    <>
                        <Typography variant='subtitle2'>Groepen beheren</Typography>
                        {groups.map(group => {
                            const canDelete = !group.items.length;
                            const deleteMessage = canDelete ? 'Verwijderen' : 'Verwijder eerst de items die bij deze groep horen';
                            return (
                                <Typography key={`manageGroups-${group.id}`} variant='caption'>
                                    <Tooltip title={deleteMessage} aria-label='Remove'>
                                    {canDelete ? (
                                            <IconButton className='mr'
                                                        aria-label='Remove'
                                                        onClick={() => removeGroupHandler(group.id)}
                                                        color='secondary'>
                                                <Icon>delete</Icon>
                                            </IconButton>
                                    ) : (
                                        <div style={{ display: 'inline-block' }}>
                                            <IconButton className='mr' color='default' disabled>
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        </div>
                                    )}
                                    </Tooltip>

                                    <Tooltip title={`Bewerken`} aria-label='Edit'>
                                        <IconButton className='mr'
                                                    aria-label='Edit'
                                                    onClick={() => editGroupHandler(group.id)}
                                                    color='secondary'>
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </Tooltip>
                                    <span>{group.name}</span>
                                </Typography>
                            )
                        })}
                    </>
                )}
            </div>
        );
    }
    return content
};

export default manageGroupsPopup;
