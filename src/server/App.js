import React, {useReducer} from 'react';
import '../css/App.css';
import WorkoutTable from "../front_end/main_pages/WOTable";
import WorkoutDetailTable from "../front_end/main_pages/WorkoutDetail";
import CreateMyToolbar from "../front_end/component/MyToolBar";
import {getExercisesByWorkoutId} from "./endpoints/ExerciseEndpoints";
import StartWorkout from "../front_end/main_pages/StartWorkOutMainPage";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width : '100%',
        height: '100%'
    }
}));

function init(){
    return {
        pageToDisplay: 'home',
        workoutChosen: undefined,
        buttonsToDisplay: {
            goToWorkouts : false
        },
        defaultExerciseDuration: 30,
        selectedIndex: 0
    }
}

function reducer(state, action) {
    console.log('reducer action');
    console.log(action);
    switch (action.type) {
        case 'navigateToWorkDetails': {
            const newState = JSON.parse(JSON.stringify(state));
            newState.pageToDisplay = 'workoutDetail';
            newState.workoutChosen = action.workoutChosen;
            newState.buttonsToDisplay.goToWorkouts = true;
            newState.selectedIndex = action.index;
            return newState;
        }
        case 'navigateToHome': {
            const newState = JSON.parse(JSON.stringify(state));
            newState.pageToDisplay = 'home';
            newState.workoutChosen = undefined;
            return newState;
        }
        case 'dontDisplayButtonToWorkouts': {
            const newState = JSON.parse(JSON.stringify(state));
            newState.buttonsToDisplay.goToWorkouts = false;
            return newState;
        }
        case 'startWorkout': {
            const newState = JSON.parse(JSON.stringify(state));
            newState.pageToDisplay = 'startWorkout';
            newState.workoutChosen = action.workoutChosen;
            return newState;
        }
        default:
            throw new Error();
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, init());
    const classes = useStyles();

    // useEffect(() => {}, []);

    function navigateToWorkoutDetail(workout) {
        dispatch({
            type: 'navigateToWorkDetails',
            workoutChosen: workout
        });
    }

    function navigateToHomePage() {
        dispatch({type: 'navigateToHome'});
    }

    function displayButtonToWorkouts() {
        dispatch({type: 'displayButtonToWorkouts'});
    }

    function dontDisplayButtonToWorkouts() {
        dispatch({type: 'dontDisplayButtonToWorkouts'});
    }

    function setIndexToolBarButtonSelected(index) {
        dispatch({type: 'setIndex', index: index});
    }

    function navigateToStartWorkout(workout){
        getExercisesByWorkoutId(workout.workout_id, 100, 1)
            .then(result => {
                dispatch({type: 'startWorkout', workoutChosen: result});
            });
    }

    function setTimerMaxDuration(maxDurationSec){
        let date = new Date();
        date.setSeconds(date.getSeconds() + maxDurationSec);
        return date;
    }

  return (
      <div className={classes.root}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          <CreateMyToolbar buttonsToDisplay={state.buttonsToDisplay}
                           navigateToHomePage={navigateToHomePage}/>
          <div>
              {state.pageToDisplay === 'home' &&
                  <WorkoutTable navigateToWorkoutDetail={navigateToWorkoutDetail}
                                navigateToStartWorkout={navigateToStartWorkout}/>}
              {(state.pageToDisplay=== 'workoutDetail' && state.workoutChosen != null) &&
                  <WorkoutDetailTable workout={state.workoutChosen}/> }
              {(state.pageToDisplay=== 'startWorkout' && state.workoutChosen != null) &&
                  <StartWorkout
                      expiryTimestamp={setTimerMaxDuration(state.defaultExerciseDuration)}
                      workoutChosen={state.workoutChosen.data}
                      expiryTimestampRestart={state.defaultExerciseDuration}/>}
          </div>
      </div>
  );
}

export default App;
