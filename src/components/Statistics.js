import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Container, Typography } from '@material-ui/core';
import Title from './Title';
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
                <Container className={classes.container} align="center">
                    <Typography variant="h6" component="h6" className={classes.title}>
                        コマ数
                    </Typography>
                    <ComposedChart
                        width={800}
                        height={150}
                        data={this.state.unit_data}
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
                </Container>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(Statistics);
