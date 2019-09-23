import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
}));


function ExerciseList({exercisesDone}) {
    const [exercises, setExercises] = useState(exercisesDone);
    const classes = useStyles();
    function createListOfExercises() {
        return (
            <List component="nav">
                {exercises.filter(ex => !ex.hasBeenDone)
                    .map((ex, index) => (
                    <ListItem
                        key={index}
                        button>
                        <ListItemText
                            primary={ex.name}/>
                    </ListItem>
                    ))}
            </List>
        );}

    useEffect(() => {
        console.log("ExerciseList -> useEffect");
        // createListOfExercises();
        setExercises(exercisesDone);
        console.log("exercises");
        console.log(exercises);
    });

    return (
        <div className={classes.root}>
            {createListOfExercises()}
        </div>
    );
}
export default ExerciseList;
