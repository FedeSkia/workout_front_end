import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {addWorkout, removeWorkout} from "../server/WorkoutEndpoints";
import {addExercise, getExercises} from "../server/ExerciseEndpoints";

const columns = [ {title : 'name', field : 'name'}, {title : 'description', field : 'description'},
                  {title : 'reps', field: 'repetitions'}, {title: 'sets', field: 'sets'},
                  {title : 'exercise_id', field: 'exercise_id'}
                ];

function WorkoutDetailTable(workoutId) {

    useEffect(() => {console.log('WorkoutDetailTable -> useEffect -> workoutId= ' + workoutId.workoutId)}, []);
    return (
        <div>
            <MaterialTable
                title="Workout exercises"
                columns={columns}
                actions={[
                    {
                        icon: 'navigate_next',
                        tooltip: 'Start',
                        onClick: (event, rowData) => {}
                    }
                ]}
                options={{
                    paging: false
                }}
                data={
                    query =>
                        new Promise((resolve, reject) => {
                            getExercises(workoutId.workoutId, query.pageSize, query.page).then(result => {
                                resolve({
                                    data: result.data,
                                    page: result.page,
                                    totalCount: result.total,
                                })
                            })
                        })
                }
                editable= {{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            addExercise(newData, workoutId.workout_id).then(result =>
                                resolve(result)
                            );
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            addExercise(newData).then(result => resolve());
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            // addExercise(oldData.exercise_id).then(result => resolve());
                        })
                }}
            />
        </div>
    );
}

export default WorkoutDetailTable;
