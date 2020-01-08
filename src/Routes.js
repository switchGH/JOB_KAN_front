import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RoutesWithComponents } from './components/RoutesWithComponents';
import { Frame } from './layout/Frame';

import { TimeRecord, Create } from './components';

export const Routes = () => {
    return (
        <Switch>
            {/* <Redirect
                exact
                from="/"
                to="/"
            /> */}
            <RoutesWithComponents
                component={TimeRecord}
                exact
                layout={Frame}
                path="/"
            />
            <RoutesWithComponents
                component={Create}
                exact
                layout={Frame}
                path="/create"
            />
        </Switch>
    );
};
