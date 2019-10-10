import React, {useEffect, useReducer, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    button: {
        margin: theme.spacing(1),
    }
}));

function ExerciseList({exercisesDone: exercisesToDo, updateCurrentExerciseIndex, currentExerciseIndex}) {
    const classes = useStyles();

    useEffect(() => {
        console.log('ExerciseList -> render with state:');
        console.log(exercisesToDo);
    });

    function createListOfExercises() {
        return (
            <List component="nav">
                {exercisesToDo
                    .filter(ex => !ex.hasBeenDone)
                    .map((ex, index) => (
                    <ListItem key={ex.exerciseIndex}
                              button
                              selected={ ex.exerciseIndex === currentExerciseIndex }
                              className={classes.button}
                              onClick={ event => {updateCurrentExerciseIndex(ex.exerciseIndex)}}
                        >
                        <ListItemText primary={ex.name}
                                      secondary={"Sets remaining: " + ex.sets +
                                      " Sets done: " + ex.setsDone +
                                      " Repetitions: " + ex.repetitions}
                        />
                    </ListItem>
                    ))}
            </List>
        );}


    return (
        <Box width="40%" p={1} order={1} bgcolor="grey.300">
            <Typography variant={'body1'}>
                To do:
            </Typography>
            {createListOfExercises()}
        </Box>
    );
}
export default ExerciseList;
