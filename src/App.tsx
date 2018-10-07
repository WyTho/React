import * as React from 'react';
import Layout from './components/Layout/Layout';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import routes from './config.routes';

export class App extends React.PureComponent<{}, {}> {

    public render() {

        return (
            <>
                <CssBaseline />
                <BrowserRouter>
                    <Layout>
                        { routes.map((route, i) =>
                            <Route exact={route.path === '/'}
                                   path={route.path}
                                   component={route.component}
                                   key={i}/>
                        )}
                    </Layout>
                </BrowserRouter>
            </>
        )
    }
}

export default App;
