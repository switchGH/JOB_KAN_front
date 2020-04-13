import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const RoutesWithComponents = (props) => {
    const { layout: Layout, component: Component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <Layout>
                    <Component {...matchProps} />
                </Layout>
            )}
        />
    );
};

RoutesWithComponents.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string,
};
