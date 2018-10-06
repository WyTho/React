import * as React from 'react';

interface IProps {
    x: string
}
const name = (props: IProps) => {
    const { x } = props;
    return (
        <div className='Name'>

        </div>
    );
};

export default name;
