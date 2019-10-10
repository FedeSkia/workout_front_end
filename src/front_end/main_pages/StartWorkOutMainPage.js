import MyTimer from "./Timer";
import React, {useEffect, useReducer} from "react";
import ExerciseListToDo from "../component/ListExercises";
import {Container, Typography} from "@material-ui/core";
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
    switch (action.type) {
        case 'increaseNumberOfSetsDoneOfExercise': {
            const newState = JSON.parse(JSON.stringify(state));
            let exerciseIndex = state.currentExerciseIndex;
            newState.exerciseDone[exerciseIndex].setsDone++;
            if(newState.exerciseDone[exerciseIndex].setsDone >= newState.exerciseDone[exerciseIndex].sets) {
                newState.exerciseDone[exerciseIndex].hasBeenDone = true;
            }
            return newState;
        }
        case 'updateExerciseChosen': {
            const newState = JSON.parse(JSON.stringify(state));
            newState.currentExerciseIndex = action.newExerciseIndex;
            return newState;
        }
        default:
            throw new Error();
    }
}

function init(expiryTimestampR, workoutChosenR, expiryTimestampRestartR){
    return {
        exerciseDone :  workoutChosenR.map((wo, index) => {
            wo.setsDone = 0;
            wo.hasBeenDone = false;
            wo.exerciseIndex = index;
            return wo;
        }),
        currentExerciseIndex: 0,
        expiryTimestampRestart: {expiryTimestampRestartR},
        expiryTimestamp: {expiryTimestampR}
    };
}

function StartWorkout({expiryTimestamp, workoutChosen, expiryTimestampRestart}) {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, init(expiryTimestamp, workoutChosen, expiryTimestampRestart));

    useEffect(() => {
        console.log('StartWorkout -> render with state:');
        console.log(state);
    });

    function logicForTimerWihExercises() {
        dispatch ({type: 'increaseNumberOfSetsDoneOfExercise'});
    }

    function updateCurrentExerciseIndex(exerciseIndex){
        dispatch ({type: 'updateExerciseChosen', newExerciseIndex: exerciseIndex});
    }

    return (
        <Paper className={classes.root}>
            <Container className={classes.myContainer}>
                <ExerciseListToDo exercisesDone={state.exerciseDone}
                                  updateCurrentExerciseIndex={updateCurrentExerciseIndex}
                                  currentExerciseIndex={state.currentExerciseIndex}/>
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
