import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {addExercise, getExercisesByWorkoutId, removeExercise} from "../../server/endpoints/ExerciseEndpoints";

const columns = [ {title : 'name', field : 'name'}, {title : 'description', field : 'description'},
                  {title : 'reps', field: 'repetitions'}, {title: 'sets', field: 'sets'}
                ];

function WorkoutDetailTable(props) {

    useEffect(() => {
    }, []);
    return (
        <div>
            <MaterialTable
                title={props.workout.name}
                columns={columns}
                options={{
                    paging: false
                }}
                data={
                    query =>
                        new Promise((resolve, reject) => {
                            getExercisesByWorkoutId(props.workout.workout_id, query.pageSize, query.page).then(result => {
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
                            addExercise(newData, props.workout.workout_id).then(result =>
                                resolve(result)
                            );
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            addExercise(newData, props.workout.workout_id).then(result => resolve());
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            removeExercise(oldData.exercise_id).then(result => resolve());
                        })
                }}
            />
        </div>
    );
}

export default WorkoutDetailTable;
