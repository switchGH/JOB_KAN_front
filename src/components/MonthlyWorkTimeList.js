import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { push } from 'connected-react-router';
import {
    Table,
    TableContainer,
    TablePagination,
    Paper,
} from '@material-ui/core';
import { Header, Body } from './TableComponents';
import { request } from '../modules/httpRequest';

const useStyles = (theme) => ({
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
});

const columns = [
    {
        id: 'id',
        label: 'ID',
        minWidth: 60,
        align: 'center',
        fontWeight: 'bold',
        fontSize: '17px',
    },
    {
        id: 'full_date',
        label: '日程',
        minWidth: 50,
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

class MonthlyWorkTimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseJson: [],
            page: 0,
            rowsPerPage: 10,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        //this.createArray = this.createArray.bind(this);
    }

    async componentDidMount() {
        // 認証
        if (!this.props.auth.isLoggedIn) {
            this.props.dispatch(push('/login'));
        }
        // データ取得
        const studentId = this.props.auth.user.studentId;
        const endpoint = `/work-time/${studentId}`;
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

    createArray() {
        const array = [];
        const res = this.state.responseJson;
        const id = this.props.match.params.id;
        for (let i in res) {
            if (res[i].date.month === id) {
                array.push({
                    id: res[i]._id,
                    full_date: res[i].date.full_date,
                    day: parseInt(res[i].date.day, 10),
                    worktime: res[i].time.display,
                    content: res[i].content,
                });
            }
        }
        // 昇順にソート
        array.sort((front, back) => {
            if (front.day > back.day) {
                return 1;
            } else {
                return -1;
            }
        });
        return array;
    }

    render() {
        const classes = this.props.classes;
        const workTimeList = this.createArray();
        return (
            <Paper className={classes.paper}>
                <TableContainer className={classes.container}>
                    <React.Fragment>
                        {/* <CreateTable children={list} page={this.state.page} /> */}
                        <Table stickyHeader arial-label="sticky table">
                            <Header columns={columns} />
                            <Body
                                data={{
                                    list: workTimeList,
                                    columns,
                                    page: this.state.page,
                                    rowsPerPage: this.state.rowsPerPage,
                                }}
                            />
                        </Table>
                    </React.Fragment>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 30, 50]}
                    component="div"
                    count={workTimeList.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

MonthlyWorkTimeList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(MonthlyWorkTimeList);
