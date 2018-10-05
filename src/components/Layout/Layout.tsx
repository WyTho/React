import * as React from 'react';
import './Layout.scss';

const layout = (props: any) => (
    <div className='Layout'>
        <div>Navbar, backdrop</div>
        <main className='content'>
            { props.children }
        </main>
    </div>
);

export default layout;
