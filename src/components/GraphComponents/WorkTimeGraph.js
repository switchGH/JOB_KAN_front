import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    BarChart,
} from 'recharts';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    title: {
        padding: theme.spacing(1),
    },
}));

export function WorkTimeGraph(props) {
    const classes = useStyles();
    const { graphData } = props.children;
    console.log(graphData);
    return (
        <Container className={classes.container} align="center">
            <Typography variant="h6" component="h6" className={classes.title}>
                作業時間
            </Typography>
            <BarChart width={800} height={400} data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="worktime" fill="#8884d8" />
            </BarChart>
        </Container>
    );
}
