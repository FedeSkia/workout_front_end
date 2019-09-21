export const baseUrl = "http://localhost:8080/";
export const getAllExercisesPath = "exercise/getAll";
export const insertExercisesPath = "exercise/add";
export const getAllExercisesByWorkoutId = "exercise/getAllExerciseByWorkoutID";
export const deleteExercise = "exercise/delete";

function getExercises(idWorkout, pageSize, page) {
    let url = baseUrl + getAllExercisesByWorkoutId +
        '?per_page=' + pageSize  +
        '&page=' + (page + 1) +
        '&id=' + idWorkout;
    return fetch(url).then(response => {
        return response.json();
    }); // parses JSON response into native JavaScript objects
}

function addExercise(exercise, workoutId){
    let url = baseUrl + insertExercisesPath;
    exercise.workout_id = workoutId;
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(exercise)
    }).then(response => { return response.json(); }); // parses JSON response into native JavaScript objects
}

export { getExercises, addExercise };



