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
    ComposedChart,
} from 'recharts';
import { PropTypes } from 'prop-types';
import BigNumber from 'bignumber.js/bignumber.mjs';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    title: {
        padding: theme.spacing(1),
        fontWeight: 'bold',
        color: 'lightseagreen',
    },
}));

function createTotalUnit(resJson) {
    let unitTotal = 0;
    for (let i in resJson) {
        unitTotal += resJson[i].time.convert_sec;
    }

    return [
        {
            name: 'コマ数',
            unit: BigNumber(unitTotal).div(5400).dp(1).toNumber(),
        },
    ];
}

export function UnitBarGraph(props) {
    const classes = useStyles();
    const unit = createTotalUnit(props.data);

    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Typography
                    variant="h6"
                    component="h6"
                    className={classes.title}
                >
                    合計コマ数
                </Typography>
                <ComposedChart
                    width={500}
                    height={150}
                    data={unit}
                    layout="vertical"
                >
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
            </Paper>
        </React.Fragment>
    );
}

UnitBarGraph.propTypes = {
    data: PropTypes.array.isRequired,
};
