import {Dialog, DialogTitle} from '@material-ui/core';
import * as React from 'react';

interface IPopup {
    children: any
    onClosed: any
    opened: boolean
    title: string
}

const popup = (props: IPopup) => (
    <Dialog onClose={props.onClosed}
            open={props.opened}
            fullWidth={true}
            maxWidth={'sm'}>
        <DialogTitle>{props.title}</DialogTitle>
        <div style={{ minHeight: 200 }}>
            {props.children}
        </div>
    </Dialog>
);

export default popup;
