import * as React from 'react';
import Navbar from '../Navbar/Navbar';

const layout = (props: any) => (
    <>
        <Navbar darkThemeActive={props.darkThemeActive} handleThemeToggle={props.handleThemeToggle}>
            { props.children }
        </Navbar>
    </>
);

export default layout;
