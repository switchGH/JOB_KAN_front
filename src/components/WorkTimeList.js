import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { PropTypes } from 'prop-types';
import {
    Table,
    TableContainer,
    TablePagination,
    Paper,
} from '@material-ui/core';
import { Header } from './TableComponents/Header';
import { Body } from './TableComponents/Body';
import { get } from '../modules/httpRequest';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = (theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        maxHeight: 440,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

const columns = [
    { id: 'full_date', label: '日程', minWidth: 40, align: 'center' },
    { id: 'worktime', label: '作業時間', minWidth: 50, align: 'center' },
    { id: 'content', label: '内容', minWidth: 700, align: 'center' },
];

class WorkTimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseJson: [],
            loading: false,
            page: 0,
            rowsPerPage: 10,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    async componentDidMount() {
        // 認証
        if (!this.props.auth.isLoggedIn) {
            this.props.dispatch(push('/login'));
        }
        // データ取得
        const studentId = this.props.auth.user.studentId;
        try {
            const response = await get({ studentId });
            this.setState({ responseJson: response.reverse() });
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

    // 配列の整形
    createArray() {
        const res = this.state.responseJson;
        const array = [];
        for (let i in res) {
            array.push({
                full_date: res[i].date.full_date,
                worktime: res[i].time.display,
                content: res[i].content,
            });
        }
        return array;
    }

    render() {
        const { classes } = this.props;
        const workTimeList = this.createArray();
        return (
            <Paper className={classes.paper}>
                <TableContainer className={classes.container}>
                    <React.Fragment>
                        <Table stickyHeader arial-label="sticky table">
                            <Header columns={columns} />
                            <Body
                                data={{
                                    list: workTimeList,
                                    columns: columns,
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

WorkTimeList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(WorkTimeList);
