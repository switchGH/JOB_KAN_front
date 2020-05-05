import React, { Component } from 'react';
// import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Box, Grid, Link } from '@material-ui/core';
import { Routes } from './Routes';
import configureStore, { history } from './store/configureStore';

const store = configureStore();
//const browserHistory = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
    box: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        background: 'black',
    },
    title: {
        color: 'white',
    },
    subtitle: {
        color: 'white',
    },
    copyright: {
        color: 'white',
        height: 50,
    },
}));

function Copyright() {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography
                        align="center"
                        variant="h3"
                        className={classes.title}
                    >
                        JOBKAN
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        className={classes.subtitle}
                    >
                        Let's manage your work!
                    </Typography>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="body2"
                        align="center"
                        className={classes.copyright}
                    >
                        {'Copyright © '}
                        <Link
                            color="inherit"
                            href="https://github.com/switchGH/JOB_KAN_front"
                        >
                            {'JOB_KAN 2020 Switch'}
                        </Link>{' '}
                        {/* {new Date().getFullYear()} */}
                        {'.'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {/* <Router history={browserHistory}> */}
                <ConnectedRouter history={history}>
                    <Routes />
                    <Copyright />
                </ConnectedRouter>
                {/* </Router> */}
            </Provider>
        );
    }
}
