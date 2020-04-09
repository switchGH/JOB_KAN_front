import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { push } from 'connected-react-router';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = (theme) => ({
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
    button: {
        fontWeight: 'bold',
        fontSize: '16px',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    grid: {
        marginBottom: theme.spacing(3),
    },
});

class PostWorkTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            full_date: '',
            worktime: '',
            content: '',
        };
        this.changeDate = this.changeDate.bind(this);
        this.changeWorkTime = this.changeWorkTime.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // 認証
        if (!this.props.auth.isLoggedIn) {
            this.props.dispatch(push('/login'));
        }
    }

    changeDate(e) {
        this.setState({ full_date: e.target.value });
    }

    changeWorkTime(e) {
        this.setState({ worktime: e.target.value });
    }

    changeContent(e) {
        this.setState({ content: e.target.value });
    }

    // POST
    handleClick() {
        const studentId = this.props.auth.user.studentId;
        const year = parseInt(
            this.state.full_date.split('-')[0],
            10
        ).toString();
        const month = parseInt(
            this.state.full_date.split('-')[1],
            10
        ).toString();
        const day = parseInt(this.state.full_date.split('-')[2], 10).toString();

        // POSTデータ
        const json = {
            studentId: studentId,
            date: {
                full_date: year + '/' + month + '/' + day,
                year: year,
                month: month,
                day: day,
            },
            time: {
                display: this.state.worktime,
                convert_sec: this.calSecond(this.state.worktime),
            },
            content: this.state.content,
        };
        //console.log(JSON.stringify(json));

        return fetch(
            'http://localhost:3002/api/v1/work-time/' + `${studentId}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify(json),
            }
        )
            .then((response) => response.json())
            .then(console.log)
            .catch(console.error);
    }

    calSecond(time) {
        const hour = parseInt(time.split(':')[0], 10) * 3600;
        const minutes = parseInt(time.split(':')[1], 10) * 60;
        return hour + minutes;
    }

    render() {
        const classes = this.props.classes;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <React.Fragment>
                                <Typography
                                    component="h2"
                                    variant="h6"
                                    color="primary"
                                    gutterBottom
                                >
                                    作業時間登録
                                </Typography>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid
                                        container
                                        justify="flex-start"
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            xs={4}
                                            className={classes.grid}
                                        >
                                            <TextField
                                                id="date"
                                                label="作業日時"
                                                type="date"
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={this.state.full_date}
                                                onChange={this.changeDate}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={4}
                                            className={classes.grid}
                                        >
                                            <TextField
                                                id="time"
                                                label="作業時間"
                                                type="time"
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300, // 5 min
                                                }}
                                                value={this.state.worktime}
                                                onChange={this.changeWorkTime}
                                            />
                                        </Grid>
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                <Grid
                                    container
                                    justify="flex-start"
                                    className={classes.grid}
                                >
                                    <TextField
                                        id="outlined-full-width"
                                        label="作業内容"
                                        style={{ margin: 8 }}
                                        placeholder="作業内容...."
                                        value={this.state.content}
                                        //helperText="Full width!"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        onChange={this.changeContent}
                                    />
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    className={classes.button}
                                    onClick={this.handleClick}
                                >
                                    記録
                                </Button>
                            </React.Fragment>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

PostWorkTime.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(PostWorkTime);
