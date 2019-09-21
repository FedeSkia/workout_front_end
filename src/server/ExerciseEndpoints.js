export const baseUrl = "http://localhost:8080/";
export const getAllExercisesPath = "exercise/getAll";
export const insertExercisesPath = "exercise/new";
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


export { getExercises };



