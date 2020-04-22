import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { push } from 'connected-react-router';
import {
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Container,
} from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Header } from './TableComponents';
import { request } from '../modules/httpRequest';

const useStyles = (theme) => ({
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
    {
        id: 'date',
        label: '日程',
        minWidth: 30,
        align: 'center',
        fontWeight: 'bold',
        fontSize: '17px',
    },
    {
        id: 'worktime',
        label: '作業時間',
        minWidth: 50,
        align: 'center',
        fontWeight: 'bold',
        fontSize: '17px',
    },
    {
        id: 'content',
        label: '内容',
        minWidth: 700,
        align: 'center',
        fontWeight: 'bold',
        fontSize: '17px',
    },
];

class Calendars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            //format_date: this.formatDate(new Date(), 'YYYY/MM/DD'),
            responseJson: [],
            worklist: [],
        };
    }

    async componentDidMount() {
        // 認証
        if (!this.props.auth.isLoggedIn) {
            this.props.dispatch(push('/login'));
        }
        // データ取得
        const studentId = this.props.auth.user.studentId;
        const url = `http://localhost:3002/api/v1/work-time/${studentId}`;
        try {
            const response = await request({ url, type: 'GET' });
            this.setState({ responseJson: response });
        } catch (e) {
            console.log(e);
        }
    }

    formatDate(date, format) {
        format = format.replace(/YYYY/, date.getFullYear());
        format = format.replace(/MM/, date.getMonth() + 1);
        format = format.replace(/DD/, date.getDate());

        return format;
    }

    onChange = (date) => {
        this.setState({ date });
        const format_d = this.formatDate(date, 'YYYY/MM/DD');
        // 目的日のデータ取得
        const resJson = this.state.responseJson;
        let monthData = [];
        for (let i in resJson) {
            if (resJson[i].date.full_date.replace(/-/g, '/') === format_d) {
                monthData.push({
                    _id: resJson[i]._id,
                    full_date: resJson[i].date.full_date,
                    worktime: resJson[i].time.display,
                    content: resJson[i].content,
                });
                break;
            }
        }
        this.setState({ worklist: monthData });
    };

    render() {
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
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table
                                className={classes.table}
                                aria-label="simple table"
                            >
                                <Header columns={columns} />
                                <TableBody>
                                    {this.state.worklist.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                    minWidth: 30,
                                                }}
                                                align="center"
                                            >
                                                {row.full_date}
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

Calendars.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(Calendars);
