import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
}));


function ExerciseList({exercisesDone}) {
    const classes = useStyles();

    function createListOfExercises() {
        console.log(exercisesDone);
        return (
            <List component="nav">
                {exercisesDone.map((ex, index) => {
                    {
                        if(!ex.hasBeenDone) {
                            return (
                                <ListItem
                                    key={index}
                                    button>
                                    <ListItemIcon>
                                        ICONA
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={ex.name}/>
                                </ListItem>
                            )
                        } else
                            return;
                    }})}
            </List>
        );}

    let listOfExercise = createListOfExercises();
    useEffect(() => {
        console.log("ExerciseList -> useEffect");
        listOfExercise = createListOfExercises();
    });

    return (
        <div className={classes.root}>
            {listOfExercise}
        </div>
    );
}
export default ExerciseList;
