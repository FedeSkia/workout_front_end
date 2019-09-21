import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {
    getAllWorkouts,
    addWorkout,
    removeWorkout
} from "../server/endpoints/WorkoutEndpoints";

const columns = [ {title : 'name', field : 'name'}, {title : 'description', field : 'description'},
                  {title : 'Start', field : 'start'}];

function WorkoutTable(props) {

    useEffect(() => {
        console.log('WorkoutTable -> useEffect');}, []);

    return (
        <div>
            <MaterialTable
                title="Workouts Summary"
                columns={columns}
                actions={[
                    {
                        icon: 'accessibility_new',
                        tooltip: 'Start Workout',
                        onClick: (event, rowData) => {
                            console.log(rowData);
                            console.log(event);
                            props.navigateToStartWorkout(rowData);
                        }
                    },
                    {
                        icon: 'navigate_next',
                        tooltip: 'Go to workout details',
                        onClick: (event, rowData) => {
                            console.log(rowData);
                            console.log(event);
                            props.navigateToWorkoutDetail(rowData);
                            props.displayButtonToWorkouts();
                            props.setIndexToolBarButtonSelected();
                        }
                    }
                ]}
                options={{
                    paging: true
                }}
                data={query =>
                    new Promise((resolve, reject) => {
                      getAllWorkouts(query).then(result => {
                          resolve({
                              data: result.data,
                              page: result.page - 1,
                              totalCount: result.total,
                          })
                      })
                    })
                }
                editable= {{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            addWorkout(newData).then(result => resolve());
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            addWorkout(newData).then(result => resolve());
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            removeWorkout(oldData.workout_id).then(result => resolve());
                        })
                }}
                />
        </div>
    );
}

export default WorkoutTable;
