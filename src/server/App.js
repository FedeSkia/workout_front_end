import React, {useEffect, useState} from 'react';
import '../css/App.css';
import WorkoutTable from "../front_end/WOTable";
import WorkoutDetailTable from "../front_end/WorkoutDetail";
import CreateMyToolbar from "../front_end/component/MyToolBar";

function App() {
    const [pageToDisplay, setPageToDisplay] = useState('home');
    const [workoutChosen, setWorkoutChosen] = useState(0);
    const [buttonsToDisplay, setButtonToDisplay] = useState({goToWorkouts : false});
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    useEffect(() => {console.log('App -> update')}, []);

    function navigateToWorkoutDetail(workout) {
        console.log('navigateToWorkoutDetail -> workout: ');
        console.log(workout);
        setWorkoutChosen(workout);
        setPageToDisplay('workoutDetail');
    }

    function navigateToHomePage(){
        console.log('home ');
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

  return (
      <div className="App">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          <CreateMyToolbar buttonsToDisplay={buttonsToDisplay}
                           navigateToHomePage={navigateToHomePage}
          />
          <div>
              {pageToDisplay === 'home' &&
              <WorkoutTable navigateToWorkoutDetail={navigateToWorkoutDetail}
                            displayButtonToWorkouts={displayButtonToWorkouts}
                            setIndexToolBarButtonSelected={setIndexToolBarButtonSelected}
              />}
              {(pageToDisplay=== 'workoutDetail' && workoutChosen != null) &&
              <WorkoutDetailTable workout={workoutChosen}/> }
          </div>
      </div>
  );
}

export default App;
