import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { Header } from './TableComponents/Header';
import { Body } from './TableComponents/Body';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = theme => ({
    root: {
        width: '100%',
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
    { id: 'date', label: '日程', minWidth: 30, align: 'center' },
    { id: 'worktime', label: '作業時間', minWidth: 50, align: 'center' },
    { id: 'unit', label: 'コマ数', minWidth: 10, align: 'center' },
    { id: 'content', label: '内容', minWidth: 700, align: 'center' },
];

class WorkTimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workTimeList: [],
            loading: false,
            page: 0,
            rowsPerPage: 10,
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    componentDidMount() {
        // 認証
        if (!this.props.auth.isLoggedIn) {
            this.props.dispatch(push('/login'));
        }
        // データ取得
        const studentId = this.props.auth.user.studentId;
        return fetch('http://localhost:3002/api/v1/work-time/' + `${studentId}`)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    workTimeList: responseJson,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChangePage(e, newPage) {
        this.setState({ page: newPage });
    }

    handleChangeRowsPerPage(e) {
        this.setState({ rowsPerPage: +e.target.value });
        this.setState({ page: 0 });
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <React.Fragment>
                        <Table stickyHeader arial-label="sticky table">
                            <Header
                                children={{
                                    columns: columns,
                                }}
                            />
                            <Body
                                children={{
                                    list: this.state.workTimeList,
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
                    count={this.state.workTimeList.length}
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

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(WorkTimeList);
