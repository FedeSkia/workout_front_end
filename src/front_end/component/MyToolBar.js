import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CreateMyDrawer from "./MyDrawer";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function CreateMyToolbar(props) {
    const classes = useStyles();

    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                   <CreateMyDrawer buttonsToDisplay={props.buttonsToDisplay}/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Workout management
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
export default CreateMyToolbar;
