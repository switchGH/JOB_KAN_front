import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
}));

export const AuthFrame = props => {
    const classes = useStyles();
    const { children } = props;
    return <div className={classes.root}>{children}</div>;
};
