import React from 'react';
import { Switch } from 'react-router-dom';
import { RoutesWithComponents } from './components/RootComponents/RoutesWithComponents';
import Frame from './layout/Frame';
import { AuthFrame } from './layout/AuthFrame';
import {
    WorkTimeList,
    Calendars,
    PostWorkTime,
    DeleteWorkTime,
    UpdateWorkTime,
    MonthlyWorkTimeList,
    Statistics,
    People,
    Settings,
    About,
} from './components';
import { Login } from './components/AuthComponents';

export const Routes = () => {
    return (
        <Switch>
            <RoutesWithComponents
                component={Login}
                exact
                layout={AuthFrame}
                path="/login"
            />
            {/* <Route component={UserOnly}> */}
            <RoutesWithComponents
                component={WorkTimeList}
                exact
                layout={Frame}
                path="/"
            />
            <RoutesWithComponents
                component={Calendars}
                exact
                layout={Frame}
                path="/calendar"
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
            <RoutesWithComponents
                component={DeleteWorkTime}
                exact
                layout={Frame}
                path="/delete"
            />
            <RoutesWithComponents
                component={UpdateWorkTime}
                exact
                layout={Frame}
                path="/update"
            />
            <RoutesWithComponents
                component={Statistics}
                exact
                layout={Frame}
                path="/statistics"
            />
            <RoutesWithComponents
                component={People}
                exact
                layout={Frame}
                path="/people"
            />
            <RoutesWithComponents
                component={Settings}
                exact
                layout={Frame}
                path="/settings"
            />
            <RoutesWithComponents
                component={About}
                exact
                layout={Frame}
                path="/about"
            />
        </Switch>
    );
};
