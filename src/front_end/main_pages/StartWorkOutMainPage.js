import MyTimer from "./Timer";
import React, {useEffect, useReducer} from "react";
import ExerciseList from "../component/ListExercises";
import {Container} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

/**
 * Aggiunge il campo hasBeenDone per capire se l esercizio e' stato completato.
 * @param workoutChosen
 * @returns {{}|*}
 */
function addHasBeenDoneToWorkoutChosen(workoutChosen){
    if(workoutChosen !== undefined) {
        return workoutChosen.map(wo => {
            wo.hasBeenDone = false;
            return wo;
        })
    } else
        return {};
}

function reducer(state, action) {
    switch (action) {
        case 'incrementExerciseIndex': return {
            ...state,
            currentExerciseIndex: state.currentExerciseIndex + 1};
        case 'setExerciseDone': {
            let newState = state;
            newState.exerciseDone[state.currentExerciseIndex].hasBeenDone = true;
            newState.currentExerciseIndex++;
            console.log(newState);
            return newState;
        }
        default:
            throw new Error();
    }
}

function init(expiryTimestampR, workoutChosenR, expiryTimestampRestartR){
    let newState = {
        exerciseDone :  addHasBeenDoneToWorkoutChosen(workoutChosenR),
        currentExerciseIndex: 0,
        expiryTimestampRestart: {expiryTimestampRestartR},
        expiryTimestamp: {expiryTimestampR}
    };
    return newState;
}

function StartWorkout({expiryTimestamp, workoutChosen, expiryTimestampRestart}) {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, init(expiryTimestamp, workoutChosen, expiryTimestampRestart));

    useEffect(() => {
        console.log('StartWorkout useEffect');
        console.log(state);
    });

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
                <Box className={classes.boxMaxSize} display="flex" p={1} justifyContent="right">
                    <Box width="20%" p={1} order={1} bgcolor="grey.300">
                        <ExerciseList exercisesDone={state.exerciseDone}/>
                    </Box>
                    <Box p={1} order={2}>
                        <MyTimer expiryTimestamp={expiryTimestamp}
                                 exercisesDone={state.exerciseDone}
                                 expiryTimestampRestart={30}
                                 logicForTimerWihExercises={logicForTimerWihExercises}
                        />
                    </Box>
                </Box>
            </Container>
        </Paper>
    );
}

export default StartWorkout;
