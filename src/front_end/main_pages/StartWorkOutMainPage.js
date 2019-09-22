import MyTimer from "./Timer";
import React, {useState} from "react";
import ExerciseList from "../component/ListExercises";
import {Container} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText";

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
        const exercisesDone = function (workoutChosen) {
            return workoutChosen.map(wo => {
                wo.hasBeenDone = false;
                return wo;
            })
        };
        return exercisesDone;
    } else
        return {};
}

function StartWorkout({expiryTimestamp, workoutChosen, expiryTimestampRestart}) {
    const [exercisesDone, setExercisesDone] = useState(addHasBeenDoneToWorkoutChosen(workoutChosen));
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const classes = useStyles();

    function logicForTimerWihExercises() {
        if( currentExerciseIndex !== (workoutChosen.length)) {
            let newExercisesDone = exercisesDone;
            newExercisesDone[currentExerciseIndex].hasBeenDone = true;
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setExercisesDone(newExercisesDone);
        } else {
            console.warn('You are done');
        }

    }

    return (
        <Paper className={classes.root}>
            <Container className={classes.myContainer}>
                <Box className={classes.boxMaxSize} display="flex" p={1} justifyContent="right">
                    <Box width="20%" p={1} order={1} bgcolor="grey.300">
                        <ExerciseList exercisesDone={exercisesDone}/>
                    </Box>
                    <Box p={1} order={2}>
                        <MyTimer expiryTimestamp={expiryTimestamp}
                                 exercisesDone={exercisesDone}
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
