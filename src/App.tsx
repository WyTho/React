import * as React from 'react';
import Layout from './components/Layout/Layout';
import Overview from './containers/Overview/Overview';

export class App extends React.PureComponent<{}, {}> {

    public render() {

        return (
            <>
                <Layout>
                    <Overview/>
                </Layout>
            </>
        )
    }
}
export default App;
