import {Dialog, DialogTitle } from '@material-ui/core';

import * as React from 'react';
interface IModal {
    children: any,
    opened: boolean,
    title: string
}

const modal = (props: IModal) => (
    <Dialog onClose={() => {alert('onClose')}} open={props.opened}>
        <DialogTitle>{props.title}</DialogTitle>
        {props.children}
    </Dialog>
);

export default modal;
