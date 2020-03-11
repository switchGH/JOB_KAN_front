import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Container, Typography } from '@material-ui/core';
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ComposedChart,
} from 'recharts';
import { UnitGraph } from './GraphComponents/UnitGraph';
import { WorkTimeGraph } from './GraphComponents/WorkTimeGraph';
import { isArrayExists, convertTime } from '../modules/handleArray';

const useStyles = theme => ({
    root: {
        width: '100%',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    title: {
        padding: theme.spacing(1),
    },
});

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getJsonData: [],
            worktime_data: [],
            unit_data: [
                {
                    name: 'コマ数',
                    unit: 33,
                },
            ],
        };
        //this.calculateWorkTime = this.calculateWorkTime.bind(this);
    }

    componentDidMount() {
        return fetch('http://localhost:3002/api/v1/work-time/1610370216')
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    getJsonData: responseJson,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    // 雛形を作成
    // createArray() {
    //     const list = this.state.workTimeList;
    //     for (let i = 0; i < list.length; i++) {
    //         let { judge, index } = isArrayExists(
    //             this.state.worktime_data,
    //             list[i].year,
    //             list[i].month
    //         );
    //         //console.log({ judge, index });
    //         if (judge == 'NoExit') {
    //             this.state.worktime_data.push({
    //                 year: list[i].year,
    //                 month: list[i].month,
    //                 worktime: convertTime(list[i].worktime),
    //             });
    //         } else if (judge == 'Exit') {
    //             let ct = convertTime(list[i].worktime);
    //             this.state.worktime_data[index].worktime += ct;
    //         }
    //     }
    // }

    createGraphData() {
        const allList = this.state.getJsonData;
        let graphData = [];
        for (let i = 0; i < allList.length; i++) {
            let { judge, index } = isArrayExists(
                graphData,
                allList[i].year,
                allList[i].month
            );
            if (judge == 'NoExit') {
                graphData.push({
                    year: allList[i].year,
                    month: allList[i].month,
                    name: allList[i].year + '/' + allList[i].month,
                    worktime: convertTime(allList[i].worktime),
                });
            } else if (judge == 'Exit') {
                let ct = convertTime(allList[i].worktime);
                graphData[index].worktime += ct;
            }
        }
        return graphData;
    }

    // コマ数計算

    render() {
        const classes = this.props.classes;
        const graphData = this.createGraphData();
        console.log(graphData);
        return (
            <Paper className={classes.root}>
                <WorkTimeGraph children={{ graphData: graphData }} />
                <UnitGraph children={{ unit_data: this.state.unit_data }} />
            </Paper>
        );
    }
}

export default withStyles(useStyles)(Statistics);
