import React, { useState, useEffect } from 'react';


export const baseUrl = "http://localhost:8080/";
export const getAllWorkoutsPath = "workout/getAll";
export const insertWorkoutsPath = "workout/new";
export const getAllWorkoutsWithParam = "workout/getAllWithParams";
export const deleteWorkout = "workout/delete";

function getAllWorkouts(query){
    let url = baseUrl + getAllWorkoutsWithParam;
    url += '?per_page=' + query.pageSize;
    url += '&page=' + (query.page + 1);
    return fetch(url).then(response => response.json())
}

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }
    useEffect(() => {
        fetchUrl();
    }, []);
    return [data, loading];
}

function addWorkout(data) {
    let url = baseUrl + insertWorkoutsPath;
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(response => response.json()); // parses JSON response into native JavaScript objects
}

function removeWorkout(id){
    return fetch(baseUrl + deleteWorkout + "?id=" + id, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()); // parses JSON response into native JavaScript objects
}

export { useFetch, addWorkout, getAllWorkouts, removeWorkout };



