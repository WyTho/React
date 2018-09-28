import * as React from 'react';

interface IProps {
    name: string
}

export class App extends React.Component<IProps, {}> {
    public render() {
        return <h2>Hello, {this.props.name}!</h2>
    }
}
