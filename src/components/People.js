import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { push } from 'connected-react-router';
import {
    Paper,
    Grid,
    Container,
    Typography,
    TableContainer,
    Table,
    TablePagination,
} from '@material-ui/core';
import 'react-calendar/dist/Calendar.css';
import { Header, Body } from '../components/TableComponents';
import { request } from '../modules/httpRequest';
import BigNumber from 'bignumber.js/bignumber.mjs';

const useStyles = (theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    typography: {
        paddingTop: theme.spacing(1),
        flexGrow: 1,
        fontWeight: 'bold',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
});

const columns = [
    {
        id: 'studentId',
        label: '学籍番号',
        minWidth: 30,
        align: 'center',
        fontWeight: 'bold',
        fontSize: '17px',
    },
    {
        id: 'worktime',
        label: '作業時間',
        minWidth: 30,
        align: 'center',
        fontWeight: 'bold',
        fontSize: '17px',
    },
    {
        id: 'unit',
        label: 'コマ数',
        minWidth: 30,
        align: 'center',
        fontWeight: 'bold',
        fontSize: '17px',
    },
];

class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseJson: [],
            page: 0,
            rowsPerPage: 10,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    async componentDidMount() {
        if (!this.props.auth.isLoggedIn) {
            this.props.dispatch(push('/login'));
        }
        const endpoint = '/work-time';
        try {
            const response = await request({ endpoint, type: 'GET' });
            this.setState({ responseJson: response });
        } catch (e) {
            console.log(e);
        }
    }

    handleChangePage(e, newPage) {
        this.setState({ page: newPage });
    }

    handleChangeRowsPerPage(e) {
        this.setState({ rowsPerPage: +e.target.value });
        this.setState({ page: 0 });
    }

    createWorkTime(worktime) {
        let hour = 0;
        while (3600 <= worktime) {
            worktime -= 3600;
            hour++;
        }
        const minutes = worktime / 60;
        return hour.toString() + '時間' + minutes.toString() + '分';
    }

    createArray() {
        let map = new Map();
        const resJson = this.state.responseJson;

        // 各ユーザーの作業時間足し合わせ
        for (let json of resJson) {
            if (map.get(json.studentId)) {
                const worktime =
                    map.get(json.studentId) + json.time.convert_sec;
                map.set(json.studentId, worktime);
            } else {
                map.set(json.studentId, json.time.convert_sec);
            }
        }
        let list = [];
        // オブジェクトの作成 {studentId, worktime, unit}
        for (let [key, value] of map) {
            list.push({
                studentId: key,
                worktime: this.createWorkTime(value),
                unit: BigNumber(value).div(5400).dp(1).toNumber(),
            });
        }
        return list;
    }
    render() {
        const { classes } = this.props;
        let list = [];
        if (this.props.auth.user.studentId != 1234567890) {
            list = this.createArray();
        }
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Paper className={classes.paper}>
                    <Typography
                        component="h6"
                        variant="h6"
                        color="primary"
                        className={classes.typography}
                        gutterBottom
                    >
                        全ユーザー
                    </Typography>
                    <TableContainer>
                        <React.Fragment>
                            <Table stickyHeader arial-label="sticky table">
                                <Header columns={columns} />
                                <Body
                                    data={{
                                        list,
                                        columns,
                                        page: this.state.page,
                                        rowsPerPage: this.state.rowsPerPage,
                                    }}
                                />
                            </Table>
                        </React.Fragment>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={list.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

People.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default compose(withStyles(useStyles), connect(mapStateToProps))(People);
