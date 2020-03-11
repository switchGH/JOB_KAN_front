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
    ComposedChart,
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

export function UnitGraph(props) {
    const classes = useStyles();
    const { unit_data } = props.children;
    return (
        <Container className={classes.container} align="center">
            <Typography variant="h6" component="h6" className={classes.title}>
                コマ数
            </Typography>
            <ComposedChart width={800} height={150} data={unit_data} layout="vertical">
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar
                    dataKey="unit"
                    barSize={40}
                    //stroke="rgba(34, 80, 162, 0.2)"
                    fillOpacity={1}
                    fill="#82ca9d"
                />
            </ComposedChart>
        </Container>
    );
}
