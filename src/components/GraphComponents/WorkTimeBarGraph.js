import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    BarChart,
} from 'recharts';
import { PropTypes } from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '1200px',
    },
    title: {
        align: 'center',
        fontWeight: 'bold',
        padding: theme.spacing(1),
        color: 'lightseagreen',
    },
}));

export function WorkTimeBarGraph(props) {
    const classes = useStyles();
    const worklist = props.data;

    return (
        <Paper className={classes.root}>
            <Typography variant="h6" component="h6" className={classes.title}>
                作業時間
            </Typography>
            <BarChart
                width={1100}
                height={400}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                data={worklist}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="worktime" fill="#413ea0" />
            </BarChart>
        </Paper>
    );
}

WorkTimeBarGraph.propTypes = {
    data: PropTypes.array.isRequired,
};
