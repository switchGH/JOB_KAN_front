import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from './Title';

const useStyles = theme => ({
    tableWidth: {
        width: 700,
    },
    seeMore: {
        marginTop: theme.spacing(3),
    },
    cell: {
        fontWeight: 'bold',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
});

class MonthlyWorkTimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workTimeList: [],
            loading: false,
        };
    }

    componentDidMount() {
        return fetch('http://localhost:3003/api/v1/work_time/0')
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    workTimeList: responseJson.list,
                    laoding: true,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let list = [];
        this.state.workTimeList.map(data => {
            if (data.month == this.props.match.params.id) {
                list.push(data);
            }
        });
        const classes = this.props.classes;
        const params = this.props.match.params;
        console.log(this.props.match.params);
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <React.Fragment>
                                <Title>{params.id}月</Title>
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.cell}>
                                                日程
                                            </TableCell>
                                            <TableCell className={classes.cell}>
                                                作業時間
                                            </TableCell>
                                            <TableCell className={classes.cell}>
                                                コマ数
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                className={classes.cell}
                                            >
                                                内容
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className={classes.cell}
                                            >
                                                確認ボタン
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {list.map(work => (
                                            <TableRow key={work.id}>
                                                <TableCell
                                                    align="left"
                                                    width="200"
                                                >
                                                    {work.year} / {work.month} /{' '}
                                                    {work.day}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {work.hour}時間{' '}
                                                    {work.minutes}分
                                                </TableCell>
                                                <TableCell align="center">
                                                    {work.unit}
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    className={
                                                        classes.tableWidth
                                                    }
                                                >
                                                    {work.content}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {work.flag ? (
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            textColor="#ffffff"
                                                            onClick={
                                                                this.handleClick
                                                            }
                                                        >
                                                            確認済
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={
                                                                this.handleClick
                                                            }
                                                        >
                                                            未確認
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </React.Fragment>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withStyles(useStyles)(MonthlyWorkTimeList);
