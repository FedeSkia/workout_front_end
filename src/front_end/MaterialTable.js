import React from 'react';
import MaterialTable from 'material-table';
import {
    getAllWorkouts,
    addWorkout,
    removeWorkout
} from "../server/BackEndEndpoints";

const mockData = [
    {name: "Name 1", description: " description"},
    {name: "Name 2", description: "Description 1"}];

const columns = [ {title : 'name', field : 'name'}, {title : 'description', field : 'description'}]

function MaterialTableDemo() {
    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <MaterialTable
                title="Workouts Summary"
                columns={columns}
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

export default MaterialTableDemo;
