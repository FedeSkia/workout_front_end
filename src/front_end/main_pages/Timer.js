import React, {useEffect} from 'react';
import { useTimer } from 'react-timer-hook';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

function MyTimer({expiryTimestamp, expiryTimestampRestart, logicForTimerWihExercises}) {

    const {
        seconds,
        minutes,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    useEffect(() => {});

    function restartExpirtyTimestamp(){
        let date = new Date();
        date.setSeconds(date.getSeconds() + expiryTimestampRestart);
        return date;
    }

    return (
        <Box p={1} order={2}>
            <h1>Exercise timer</h1>
            <div style={{fontSize: '100px'}}>
               <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <Button onClick={start}>Start</Button>
            <Button onClick={pause}>Pause</Button>
            <Button onClick={resume}>Resume</Button>
            <Button onClick={() => {
                logicForTimerWihExercises();
                restart(restartExpirtyTimestamp());
            }}>Next exercise</Button>
        </Box>
    );
}
export default MyTimer;
