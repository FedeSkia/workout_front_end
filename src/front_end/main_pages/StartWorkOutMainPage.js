import MyTimer from "./Timer";
import React, {useEffect, useReducer} from "react";
import ExerciseListToDo from "../component/ListExercises";
import {Container, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListExercisesDone from "../component/ExercisesDone";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    myContainer: {
        maxWidth: 'xl'
    },
    boxMaxSize: {
        width: '100%'
    }
}));

function reducer(state, action) {
    switch (action) {
        case 'setExerciseDone': {
            const newState = JSON.parse(JSON.stringify(state));
            newState.exerciseDone[state.currentExerciseIndex].hasBeenDone = true;
            newState.currentExerciseIndex++;
            return newState;
        }
        default:
            throw new Error();
    }
}

function init(expiryTimestampR, workoutChosenR, expiryTimestampRestartR){
    return {
        exerciseDone :  workoutChosenR.map(wo => {wo.hasBeenDone = false; return wo;}),
        currentExerciseIndex: 0,
        expiryTimestampRestart: {expiryTimestampRestartR},
        expiryTimestamp: {expiryTimestampR}
    };
}

function StartWorkout({expiryTimestamp, workoutChosen, expiryTimestampRestart}) {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, init(expiryTimestamp, workoutChosen, expiryTimestampRestart));

    function logicForTimerWihExercises() {
        if( state.currentExerciseIndex < workoutChosen.length) {
            dispatch ('setExerciseDone');
        } else {
            console.warn('You are done');
        }
    }

    return (
        <Paper className={classes.root}>
            <Container className={classes.myContainer}>
                <ExerciseListToDo exercisesDone={state.exerciseDone}/>
                <MyTimer expiryTimestamp={expiryTimestamp}
                         exercisesDone={state.exerciseDone}
                         expiryTimestampRestart={30}
                         logicForTimerWihExercises={logicForTimerWihExercises}
                />
                <ListExercisesDone exercisesDone={state.exerciseDone}/>
            </Container>
        </Paper>
    );
}

export default StartWorkout;
