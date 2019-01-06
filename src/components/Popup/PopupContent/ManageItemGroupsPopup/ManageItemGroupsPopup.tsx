import * as React from 'react';
import {IPassedPopupContentProps, IReduxPopupContentProps} from '../PopupContent';
import {IApiItem} from '../../../../utils/data/dataTypes';
import Loading from '../../../../components/Loading/Loading'
import {Button, Divider, Icon, IconButton, Tooltip, Typography} from '@material-ui/core';
import {PopupType} from '../../../../utils/popup/popup';

const manageItemGroupsPopup = (props: IPassedPopupContentProps & IReduxPopupContentProps) => {
    const { popup, groups, items } = props;

    const addItemToGroupHandler = (groupId: number) => {
        props.addItemToGroup(item.id, groupId)
    };
    const removeItemFromGroupHandler = (groupId: number) => {
        props.removeItemFromGroup(item.id, groupId)
    };
    const groupsManagerClickHandler = () => {
        props.pushPopup({
            type: PopupType.MANAGE_GROUPS,
            title: 'Groepen beheren',
            data: null
        })
    };

    // get a live copy from redux
    const item: IApiItem = items.find((i: IApiItem) => i.id === (popup.data as IApiItem).id);

    let content = <div className='absoluteFlexContainer'><Loading /></div>;
    if (item && groups) {

        const addedGroups    = groups.filter(group =>  item.groups.find(itemGroup => itemGroup.id === group.id));
        const notAddedGroups = groups.filter(group => !item.groups.find(itemGroup => itemGroup.id === group.id));

        content = (
            <div className='popupContent manageItemGroups'>
                <Button variant='contained'
                        onClick={groupsManagerClickHandler}
                        color='primary'
                        style={{ marginBottom: 24, float: 'right' }}>
                    Groepen beheren
                </Button>
                {!addedGroups.length ? null : (
                    <>
                        <Typography variant='subtitle2'>Groepen waar dit apparaat in zit</Typography>
                        {addedGroups.map(group => (
                            <Typography key={`addItemToGroup-${group.id}`} variant='caption'>
                                <Tooltip title={`'${item.name}' verwijderen uit groep '${group.name}'`} aria-label='Remove'>
                                    <IconButton className='mr'
                                                aria-label='Remove'
                                                onClick={() => removeItemFromGroupHandler(group.id)}
                                                color='secondary'>
                                        <Icon>remove</Icon>
                                    </IconButton>
                                </Tooltip>
                                <span>{group.name}</span>
                            </Typography>
                        ))}
                    </>
                )}
                {addedGroups.length && notAddedGroups.length ? <Divider className='mb' /> : null}
                {!notAddedGroups.length ? null : (
                    <>
                        <Typography variant='subtitle2'>{!addedGroups.length ? 'Groepen' : 'Andere groepen'}</Typography>
                        {notAddedGroups.map(group => (
                            <Typography key={`addItemToGroup-${group.id}`} variant='caption'>
                                <Tooltip title={`'${item.name}' toevoegen aan groep '${group.name}'`} aria-label='Toevoegen'>
                                    <IconButton className='mr'
                                                aria-label='Add'
                                                onClick={() => addItemToGroupHandler(group.id)}
                                                color='primary'>
                                        <Icon>add</Icon>
                                    </IconButton>
                                </Tooltip>
                                <span>{group.name}</span>
                            </Typography>
                        ))}
                    </>
                )}
            </div>
        );
    }
    return content
};

export default manageItemGroupsPopup;
