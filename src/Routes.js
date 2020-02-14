import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RoutesWithComponents } from './components/RoutesWithComponents';
import { Frame } from './layout/Frame';
import { WorkTimeList, PostWorkTime, MonthlyWorkTimeList } from './components';

export const Routes = () => {
    return (
        <Switch>
            {/* <Redirect
                exact
                from="/"
                to="/"
            /> */}
            <RoutesWithComponents
                component={WorkTimeList}
                exact
                layout={Frame}
                path="/"
            />
            <RoutesWithComponents
                component={MonthlyWorkTimeList}
                exact
                layout={Frame}
                path="/month/:id"
            />
            <RoutesWithComponents
                component={PostWorkTime}
                exact
                layout={Frame}
                path="/post"
            />
        </Switch>
    );
};
