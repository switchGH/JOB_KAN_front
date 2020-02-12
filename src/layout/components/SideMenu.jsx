import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ReorderIcon from '@material-ui/icons/Reorder';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} {...props} />
));

export const MainListItems = props => {
    return (
        <div>
            <ListItem button>
                <Button component={LinkBehavior} to="/">
                    <ListItemIcon>
                        <ReorderIcon />
                    </ListItemIcon>
                    <ListItemText primary="作業記録一覧" />
                </Button>
            </ListItem>
        </div>
    );
};

export const SecondaryListItems = () => {
    return (
        <div>
            <ListSubheader inset>SUB</ListSubheader>
            <ListItem button>
                <Button component={LinkBehavior} to="/post">
                    <ListItemIcon>
                        <CreateIcon />
                    </ListItemIcon>
                    <ListItemText primary="作業記録" />
                </Button>
            </ListItem>
            <ListItem button>
                <Button component={LinkBehavior} to="/settings">
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="設定" />
                </Button>
            </ListItem>
        </div>
    );
};
