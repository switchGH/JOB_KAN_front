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
import { Header } from './TableComponents/Header';
import { Body } from './TableComponents/Body';
import { createMonthlyList } from '../modules/handleArray';

const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

const columns = [
    { id: 'full_date', label: '日程', minWidth: 40, align: 'center' },
    { id: 'worktime', label: '作業時間', minWidth: 50, align: 'center' },
    { id: 'content', label: '内容', minWidth: 700, align: 'center' },
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

    componentDidMount() {
        //const studentId = this.props.auth.user.studentId;
        const studentId = 1610370216;
        return fetch('http://localhost:3002/api/v1/work-time/' + `${studentId}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    responseJson: responseJson,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChangePage(e, newPage) {
        //console.log(newPage);
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
            if (res[i].date.month == id) {
                array.push({
                    full_date: res[i].date.full_date,
                    worktime: res[i].time.display,
                    content: res[i].connect,
                });
            }
        }
        return array;
    }

    render() {
        const classes = this.props.classes;
        const workTimeList = this.createArray();
        return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <React.Fragment>
                        {/* <CreateTable children={list} page={this.state.page} /> */}
                        <Table stickyHeader arial-label="sticky table">
                            <Header children={{ columns: columns }} />
                            <Body
                                children={{
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

MonthlyWorkTimeList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(MonthlyWorkTimeList);
