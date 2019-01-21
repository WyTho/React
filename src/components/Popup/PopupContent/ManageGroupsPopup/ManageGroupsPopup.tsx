import * as React from 'react';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';
import Loading from '../../../../components/Loading/Loading'
import {Button, Icon, IconButton, Tooltip, Typography} from '@material-ui/core';
import {PopupType} from '../../../../utils/popup/popup';
import {IApiGroup} from '../../../../utils/data/dataTypes';

const manageGroupsPopup = (props: IPassedPopupContentProps & IReduxPopupContentProps) => {
    const { groups } = props;

    const removeGroupHandler = (group: IApiGroup) => {
        let confirmation;

        if (group.items.length) {
            confirmation = confirm(`Er zitten nog ${group.items.length} item(s) in de groep '${group.name}', weet je zeker dat je dit wilt verwijderen?`);
        } else {
            confirmation = confirm(`Weet je zeker dat je groep '${group.name}' wilt verwijderen?`);
        }

        if (confirmation) {
            props.removeGroup(group.id);
        }
    };
    const editGroupHandler = (group: IApiGroup) => {
        props.pushPopup({
            type: PopupType.GROUP,
            title: 'Groep wijzigen',
            data: group
        });
    };
    const addGroupHandler = () => {
        props.pushPopup({
            type: PopupType.GROUP,
            title: 'Nieuwe groep aanmaken',
            data: null
        })
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

                            let deleteMessage = 'Verwijderen';
                            let editMessage = 'Bewerken';

                            if (group.is_module) {
                                deleteMessage = 'Een module van het huis is niet te verwijderen';
                                editMessage = 'Een module van het huis is niet te bewerken';
                            }
                            return (
                                <Typography key={`manageGroups-${group.id}`} variant='caption'>
                                    <Tooltip title={deleteMessage} aria-label='Remove'>
                                    {!group.is_module ? (
                                            <IconButton className='mr'
                                                        aria-label='Remove'
                                                        onClick={() => removeGroupHandler(group)}
                                                        color='secondary'>
                                                <Icon>delete</Icon>
                                            </IconButton>
                                    ) : (
                                        <div style={{ display: 'inline-block' }}>
                                            <IconButton className='mr' disabled>
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        </div>
                                    )}
                                    </Tooltip>

                                    <Tooltip title={editMessage} aria-label='Edit'>
                                        {!group.is_module ? (
                                            <IconButton className='mr'
                                                        aria-label='Edit'
                                                        onClick={() => editGroupHandler(group)}
                                                        color='secondary'>
                                                <Icon>edit</Icon>
                                            </IconButton>
                                        ) : (
                                            <div style={{ display: 'inline-block' }}>
                                                <IconButton className='mr' disabled>
                                                    <Icon>edit</Icon>
                                                </IconButton>
                                            </div>
                                        )}
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
