import React, {useEffect, useReducer, useState} from 'react';
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

function App() {
    const [pageToDisplay, setPageToDisplay] = useState('home');
    const [workoutChosen, setWorkoutChosen] = useState(undefined);
    const [buttonsToDisplay, setButtonToDisplay] = useState({goToWorkouts : false});
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [defaultExerciseDuration, setDefaultExerciseDuration] = useState(30);
    const classes = useStyles();

    useEffect(() => {}, []);

    function navigateToWorkoutDetail(workout) {
        setWorkoutChosen(workout);
        setPageToDisplay('workoutDetail');
    }

    function navigateToHomePage(){
        setWorkoutChosen({});
        setPageToDisplay('home');
    }

    function displayButtonToWorkouts() {
        setButtonToDisplay({goToWorkouts: true});
    }

    function dontDisplayButtonToWorkouts() {
        setButtonToDisplay({goToWorkouts: false});
    }

    function setIndexToolBarButtonSelected(index) {
        setSelectedIndex(index);
    }

    function navigateToStartWorkout(workout){
        getExercisesByWorkoutId(workout.workout_id, 100, 1)
            .then(result => {
                setWorkoutChosen(result);
                setPageToDisplay('startWorkout');
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
          <CreateMyToolbar buttonsToDisplay={buttonsToDisplay}
                           navigateToHomePage={navigateToHomePage}
          />
          <div>
              {pageToDisplay === 'home' &&
              <WorkoutTable navigateToWorkoutDetail={navigateToWorkoutDetail}
                            displayButtonToWorkouts={displayButtonToWorkouts}
                            setIndexToolBarButtonSelected={setIndexToolBarButtonSelected}
                            navigateToStartWorkout={navigateToStartWorkout}
              />}
              {(pageToDisplay=== 'workoutDetail' && workoutChosen != null) &&
              <WorkoutDetailTable workout={workoutChosen}/> }
              {(pageToDisplay=== 'startWorkout' && workoutChosen != null) &&
                  <StartWorkout
                      expiryTimestamp={setTimerMaxDuration(defaultExerciseDuration)}
                      workoutChosen={workoutChosen.data}
                      expiryTimestampRestart={defaultExerciseDuration}
                  />

              }
          </div>
      </div>
  );
}

export default App;
