import React, {useEffect, useState} from 'react';
import '../css/App.css';
import WorkoutTable from "../front_end/WOTable";
import WorkoutDetailTable from "../front_end/WorkoutDetail";
import AppBar from "@material-ui/core/AppBar";
import CreateMyToolbar from "../front_end/component/MyToolBar";
import CreateMyDrawer from "../front_end/component/MyDrawer";

function App() {
    const [pageToDisplay, setPageToDisplay] = useState('workoutTable');
    const [workoutChosen, setWorkoutChosen] = useState(0);
    useEffect(() => {console.log('App -> useEffect')}, []);

    function navigateToWorkoutDetail(workout) {
        console.log('navigateToWorkoutDetail -> workout: ');
        console.log(workout);
        setWorkoutChosen(workout);
        setPageToDisplay('workoutDetail');
    }

  return (
      <div className="App">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          <CreateMyToolbar/>
          <div>
              {pageToDisplay === 'workoutTable' &&
              <WorkoutTable navigateToWorkoutDetail={navigateToWorkoutDetail}/>}
              {(pageToDisplay=== 'workoutDetail' && workoutChosen != null) &&
              <WorkoutDetailTable workout={workoutChosen}/> }
          </div>
      </div>
  );
}

export default App;
