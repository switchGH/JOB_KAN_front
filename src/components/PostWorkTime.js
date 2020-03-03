import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Title from './Title';

const useStyles = theme => ({
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
            date: '2019-05-24',
            work_time: '07:30',
            unit: 0,
            content: '',
            verified: false,
            response: {
                list: [],
            },
        };
        this.changeDate = this.changeDate.bind(this);
        this.changeWorkTime = this.changeWorkTime.bind(this);
        //this.changeUnit = this.changeUnit.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        return fetch('http://localhost:3003/api/v1/work_time/0')
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.list);
                this.setState({
                    response: { list: responseJson.list },
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    changeDate(e) {
        this.setState({ date: e.target.value });
    }

    changeWorkTime(e) {
        this.setState({ work_time: e.target.value });
    }

    // changeUnit(e) {
    //     // unit計算を行う
    //     this.setState({ unit: e.target.value });
    // }

    changeContent(e) {
        this.setState({ content: e.target.value });
    }

    handleClick() {
        let userId = 0;
        let body = {
            year: this.state.date.split('-')[0],
            month: this.state.date.split('-')[1],
            day: this.state.date.split('-')[2],
            hour: parseInt(this.state.work_time.split(':')[0], 10),
            minutes: parseInt(this.state.work_time.split(':')[1], 10),
            unit: this.state.unit,
            content: this.state.content,
            verified: this.state.verified,
        };
        this.state.response.list.push(body);
        const json = this.state.response.list;
        //console.log(this.state.response.list);
        const method = 'POST';
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        return fetch('http://localhost:3003/api/v1/work_time/0', {
            method,
            headers,
            json,
        })
            .then(response => response.json())
            .then(console.log)
            .catch(console.error);
    }

    render() {
        const classes = this.props.classes;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <React.Fragment>
                                <Title>作業記録</Title>
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
                                                value={this.state.date}
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
                                                value={this.state.work_time}
                                                onChange={this.changeWorkTime}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={4}
                                            className={classes.grid}
                                        >
                                            <TextField
                                                id="unit"
                                                label="コマ数"
                                                type="number"
                                                className={classes.textField}
                                                value={this.state.unit}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
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

export default withStyles(useStyles)(PostWorkTime);
