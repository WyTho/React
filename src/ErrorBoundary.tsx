import * as React from 'react';

interface IState {
    hasError: boolean,
    errorName: string,
    errorMessage: string
}

export class ErrorBoundary extends React.Component<{}, IState> {
    public state: IState = {
        hasError: false,
        errorName: '',
        errorMessage: ''
    };

    public componentDidCatch = (error: Error, info: React.ErrorInfo) => {
        this.setState({
            hasError: true,
            errorName: error.name,
            errorMessage: error.message
        })
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1 color='red'>{this.state.errorName}</h1>
                    <h3 color='red'>{this.state.errorMessage}</h3>
                </div>
            )
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
