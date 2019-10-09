export const baseUrl = "http://localhost:8080/";
export const getAllExercisesPath = "exercise/getAll";
export const insertExercisesPath = "exercise/add";
export const getAllExercisesByWorkoutId = "exercise/getAllExerciseByWorkoutID";
export const deleteExercise = "exercise/delete/";

function getExercisesByWorkoutId(workout_id, pageSize, page) {
    let url = baseUrl + getAllExercisesByWorkoutId +
        '?per_page=' + pageSize  +
        '&page=' + (page + 1) +
        '&id=' + workout_id;
    return fetch(url).then(response => {
        return response.json();
    }); // parses JSON response into native JavaScript objects
}

function addExercise(exercise, workoutId){
    let url = baseUrl + insertExercisesPath;
    exercise.workout_id = workoutId;
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exercise)
    }).then(response => { return response.json(); })
        .catch((error) => console.log(error)); // parses JSON response into native JavaScript objects
}

function removeExercise(id){
    let url = baseUrl + deleteExercise + id;
    return fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => { return response.json(); }); // parses JSON response into native JavaScript objects
}

export { getExercisesByWorkoutId, addExercise, removeExercise };



