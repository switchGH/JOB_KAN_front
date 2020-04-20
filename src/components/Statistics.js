import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { Container, Grid } from '@material-ui/core';
import {
    WorkTimeBarGraph,
    UnitBarGraph,
    TotalMonthTime,
} from './GraphComponents';
import { isArrayExists } from '../modules/handleArray';
import { get } from '../modules/httpRequest';

const useStyles = (theme) => ({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    grid: {
        align: 'center',
    },
});

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseJson: [],
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
            const response = await get({ url });
            this.setState({ responseJson: response });
        } catch (e) {
            console.log(e);
        }
    }

    // 雛形を作成
    createArray() {
        const resJson = this.state.responseJson;
        const worklist = [];
        for (let i = 0; i < resJson.length; i++) {
            const { year, month } = resJson[i].date;
            const second = resJson[i].time.convert_sec;
            // 同じ年月のものがないか確認
            let { judge, index } = isArrayExists(worklist, year, month);
            // 同じ日付がないなら、配列を作成
            if (judge == 'NoExit') {
                worklist.push({
                    date: year + '/' + month,
                    year: year,
                    month: month,
                    worktime: second,
                });
                // 同じ日付が既に存在するなら、その配列に作業時間を加算
            } else if (judge == 'Exit') {
                worklist[index].worktime += second;
            }
        }
        return worklist;
    }

    render() {
        const worklist = this.createArray();
        const classes = this.props.classes;
        return (
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <WorkTimeBarGraph data={worklist} />
                    </Grid>
                    <Grid item xs={6}>
                        <TotalMonthTime data={worklist} />
                    </Grid>
                    <Grid item xs={6}>
                        <UnitBarGraph data={this.state.responseJson} />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

Statistics.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(Statistics);
