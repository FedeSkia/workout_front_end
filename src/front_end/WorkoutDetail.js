import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {addWorkout, removeWorkout} from "../server/WorkoutEndpoints";
import { getExercises } from "../server/ExerciseEndpoints";

const columns = [ {title : 'name', field : 'name'}, {title : 'description', field : 'description'},
                  {title : 'reps', field: 'repetitions'}, {title: 'sets', field: 'sets'}];


const data = [
    { exercise_id: '1', name: 'Baran', description: 'description', repetitions: 63 , sets: 10}
];


function WorkoutDetailTable(workoutId) {

    useEffect(() => {console.log('WorkoutDetailTable -> useEffect -> workoutId= ' + workoutId.workoutId)}, []);
    return (
        <div>
            <MaterialTable
                title="Workouts Summary"
                columns={columns}
                actions={[
                    {
                        icon: 'navigate_next',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => {}
                    }
                ]}
                options={{
                    paging: true
                }}
                data={ data }



                    // query => {}
                    // new Promise((resolve, reject) => {
                    //     getExercises(workoutId.workoutId, query.pageSize, query.page).then(result => {
                    //         console.log(result);
                    //         resolve({
                    //             data: result.data,
                    //             page: result.page,
                    //             totalCount: result.total,
                    //         })
                    //     }).catch(error => console.log(error))
                    // })
                // }
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

export default WorkoutDetailTable;
