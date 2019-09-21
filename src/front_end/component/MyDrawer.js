import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import {Home, NavigateBefore} from "@material-ui/icons";


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function CreateMyDrawer(props) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    function handleListItemClick(event, index) {
        setSelectedIndex(index);
    }

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem
                    button
                    selected={selectedIndex === 0}
                    onClick={event => {
                        handleListItemClick(event, 0);
                        props.navigateToHomePage();
                    }}
                >
                    <ListItemIcon >
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary={'Home'}/>
                </ListItem>
            </List>
            {props.buttonsToDisplay.goToWorkouts &&
                <List>
                    {['Go to workout'].map((text, index) => (
                        <ListItem button
                                  selected={selectedIndex === 1}
                                  onClick={event => {
                                      handleListItemClick(event, 1);
                                      props.navigateToHomePage();
                                  }}
                        >
                            <ListItemIcon>
                                <NavigateBefore/>
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            }
        </div>
    );

    return (
        <div>
            <Button onClick={toggleDrawer('left', true)}><MenuIcon/></Button>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}
export default CreateMyDrawer;
