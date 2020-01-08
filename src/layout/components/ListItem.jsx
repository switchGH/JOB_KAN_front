import React from 'react';
import { withRouter } from 'react-router-dom'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ReorderIcon from '@material-ui/icons/Reorder';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" {...props} />
));

export const MainListItems = () => {

    return (
        <div>
            <Router>
            <Link to="/">
                <ListItem button>
                <ListItemIcon>
                    <ReorderIcon />
                </ListItemIcon>
                <ListItemText primary="作業記録一覧" />
                </ListItem>
            </Link>
            </Router>
        </div>
    );
};

export const SecondaryListItems = () => {

    return (
        <Router>
            <div>
                <Link component={LinkBehavior}>Without prop forwarding</Link>
                <ListSubheader inset>SUB</ListSubheader>
                    <ListItem button>
                    <ListItemIcon>
                        <CreateIcon />
                    </ListItemIcon>
                    <Link component={RouterLink} to="/create">作業記録</Link>
                    {/* <ListItemText primary="作業記録" /> */}
                    </ListItem>
                <ListItem button>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="設定" />
                </ListItem>
            </div>
        </Router>
    );
}