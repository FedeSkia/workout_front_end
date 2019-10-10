import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
}));

function ListExercisesDone({exercisesDone}) {
    // const classes = useStyles();

    useEffect(() => {
        console.log('ListExercisesDone -> render with exerciseDone');
        console.log(exercisesDone)
    });

    function createListOfExercises() {
        return (
            <List component="nav">
                {exercisesDone.filter(ex => ex.hasBeenDone)
                    .map((ex, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={ex.name} secondary={ex.setsDone}/>
                        </ListItem>
                    ))}
            </List>
        );}


    return (
        <Box width="40%" p={1} order={1} bgcolor="grey.300">
            <Typography variant={'body1'}>
                Done:
            </Typography>
            {createListOfExercises()}
        </Box>
    );
}
export default ListExercisesDone;
