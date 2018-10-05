import * as React from 'react';
import Layout from './components/Layout/Layout';
import Overview from './containers/Overview/Overview';
import { CssBaseline } from '@material-ui/core';

export class App extends React.PureComponent<{}, {}> {

    public render() {

        return (
            <>
                <CssBaseline />
                <Layout>
                    <Overview/>
                </Layout>
            </>
        )
    }
}

export default App;
