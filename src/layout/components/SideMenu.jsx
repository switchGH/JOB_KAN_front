import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ReorderIcon from '@material-ui/icons/Reorder';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import Calendar from '@material-ui/icons/CalendarToday';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Collapse from '@material-ui/core/Collapse';
import BarChar from '@material-ui/icons/BarChart';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    // root: {
    //     width: '100%',
    //     maxWidth: 360,
    //     backgroundColor: theme.palette.background.paper,
    // },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} {...props} />
));

export const MainListItems = props => {
    const classes = useStyles();
    const year = [
        { id: 2, month: '2月' },
        { id: 3, month: '3月' },
        { id: 4, month: '4月' },
        { id: 5, month: '5月' },
        { id: 6, month: '6月' },
        { id: 7, month: '7月' },
        { id: 8, month: '8月' },
        { id: 9, month: '9月' },
        { id: 10, month: '10月' },
        { id: 11, month: '11月' },
        { id: 12, month: '12月' },
        { id: 1, month: '1月' },
    ];
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItem button component={LinkBehavior} to="/">
                {/* <Button component={LinkBehavior} to="/"> */}
                <ListItemIcon>
                    <ReorderIcon />
                </ListItemIcon>
                <ListItemText primary="作業記録一覧" />
                {/* </Button> */}
            </ListItem>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <Calendar />
                </ListItemIcon>
                <ListItemText primary="月別" />
                {open ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
            <Collapse in={!open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {year.map(data => (
                        <ListItem
                            button
                            component={LinkBehavior}
                            to={'/month/' + data.id}
                            // value={data}
                            className={classes.nested}
                        >
                            <ListItemIcon>
                                <ScheduleIcon />
                            </ListItemIcon>
                            <ListItemText primary={data.month} />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            <ListItem button component={LinkBehavior} to="/statistics">
                {/* <Button component={LinkBehavior} to="/"> */}
                <ListItemIcon>
                    <BarChar />
                </ListItemIcon>
                <ListItemText primary="統計" />
                {/* </Button> */}
            </ListItem>
        </div>
    );
};

export const SecondaryListItems = () => {
    return (
        <div>
            <ListSubheader inset>SUB</ListSubheader>
            <ListItem button component={LinkBehavior} to="/post">
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="作業記録" />
            </ListItem>
            <ListItem button component={LinkBehavior} to="/settings">
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="設定" />
            </ListItem>
        </div>
    );
};
