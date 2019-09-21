import React, {useEffect, useState} from 'react';
import '../css/App.css';
import WorkoutTable from "../front_end/WOTable";
import WorkoutDetailTable from "../front_end/WorkoutDetail";

function App() {
    const [pageToDisplay, setPageToDisplay] = useState('workoutTable');
    const [workoutId, setWorkoutId] = useState(0);
    useEffect(() => {console.log('App -> useEffect')}, []);

    function navigateToWorkoutDetail(workoutId) {
        console.log('navigateToWorkoutDetail');
        setWorkoutId(workoutId);
        setPageToDisplay('workoutDetail');
    }

  return (
    <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        {pageToDisplay === 'workoutTable' &&
             <WorkoutTable navigateToWorkoutDetail={navigateToWorkoutDetail}/>}
        {(pageToDisplay=== 'workoutDetail' && workoutId != null) &&
             <WorkoutDetailTable workoutId={workoutId}/> }
    </div>
  );
}

export default App;
