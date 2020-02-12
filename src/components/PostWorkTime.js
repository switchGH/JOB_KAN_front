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
            date: '2017-05-24',
            work_time: '07:30',
            content: '',
            verified: false,
        };
        this.changeDate = this.changeDate.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    changeDate(e) {
        this.setState({ date: e.target.value });
    }

    changeWorkTime(e) {
        this.setState({ work_time: e.target.value });
    }

    changeContent(e) {
        this.setState({ content: e.target.value });
    }

    handleClick() {
        console.log(this.state);
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
                                            xs={6}
                                            className={classes.grid}
                                        >
                                            <TextField
                                                id="date"
                                                label="開始時刻"
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
                                            xs={6}
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
