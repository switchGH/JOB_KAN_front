import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Calendar from 'react-calendar';
import { Header } from './TableComponents/Header';
import 'react-calendar/dist/Calendar.css';

const useStyles = theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        textAlign: 'center',
        flexDirection: 'column',
    },
    paper_bottom: {
        fontSize: '20px',
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        textAlign: 'center',
        flexDirection: 'column',
    },
    table: {
        minWidth: 650,
    },
});

const columns = [
    { id: 'date', label: '日程', minWidth: 30, align: 'center' },
    { id: 'worktime', label: '作業時間', minWidth: 50, align: 'center' },
    { id: 'unit', label: 'コマ数', minWidth: 10, align: 'center' },
    { id: 'content', label: '内容', minWidth: 700, align: 'center' },
];

class Calendars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            format_date: this.formatDate(new Date(), 'YYYY/MM/DD'),
            work_time_list: [],
            list: [],
        };
    }

    componentDidMount() {
        // 認証
        if (!this.props.auth.isLoggedIn) {
            this.props.dispatch(push('/login'));
        }
        // データ取得
        const studentId = this.props.auth.user.studentId;
        return fetch('http://localhost:3002/api/v1/work-time/' + `${studentId}`)
            .then(res => res.json())
            .then(resJson => {
                this.setState({
                    work_time_list: resJson,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    formatDate(date, format) {
        format = format.replace(/YYYY/, date.getFullYear());
        format = format.replace(/MM/, date.getMonth() + 1);
        format = format.replace(/DD/, date.getDate());

        return format;
    }

    onChange = date => {
        this.setState({ date });
        const d = this.formatDate(date, 'YYYY/MM/DD');
        this.state.format_date = d;

        // 目的日のデータ取得
        const arr = this.state.work_time_list;
        let time = [];
        for (let i in arr) {
            if (arr[i].date == d) {
                time.push(arr[i]);
                break;
            }
        }
        this.setState({ list: time });
    };

    render() {
        console.log(this.state);
        const { classes } = this.props;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {/* <div> */}
                            <Calendar
                                onClickDay={this.onClickDay}
                                onChange={this.onChange}
                                value={this.state.date}
                            />
                            {/* </div> */}
                        </Paper>
                        {/* <Paper className={classes.paper_bottom}>
                            <span>日程：　{this.state.format_date}</span>
                            <span>作業時間：　{this.state.work_time}</span>
                        </Paper> */}
                        <TableContainer component={Paper}>
                            <Table
                                className={classes.table}
                                aria-label="simple table"
                            >
                                <Header children={{ columns: columns }} />
                                <TableBody>
                                    {this.state.list.map(row => (
                                        <TableRow key={row._id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                    minWidth: 30,
                                                }}
                                                align="center"
                                            >
                                                {row.date}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    minWidth: 50,
                                                }}
                                                align="center"
                                            >
                                                {row.worktime}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    minWidth: 10,
                                                }}
                                                align="center"
                                            >
                                                {row.unit}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    minWidth: 700,
                                                }}
                                                align="center"
                                            >
                                                {row.content}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(Calendars);
