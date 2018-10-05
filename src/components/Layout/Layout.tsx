import * as React from 'react';
import Navbar from '../Navbar/Navbar';

const layout = (props: any) => (
    <>
        <Navbar>
            { props.children }
        </Navbar>
    </>
);

export default layout;
