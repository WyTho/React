import {Dialog, DialogTitle } from '@material-ui/core';

import * as React from 'react';
interface IModal {
    children: any,
    onClosed: any,
    opened: boolean,
    title: string
}

const modal = (props: IModal) => (
    <Dialog onClose={props.onClosed} open={props.opened}>
        <DialogTitle>{props.title}</DialogTitle>
        {props.children}
    </Dialog>
);

export default modal;
