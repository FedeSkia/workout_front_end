import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({expiryTimestamp, workoutChosen, expiryTimestampRestart}) {

    const {
        seconds,
        minutes,
        hours,
        days,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    function restartExpirtyTimestamo(){
        let date = new Date();
        date.setSeconds(date.getSeconds() + expiryTimestampRestart);
        return date;
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Exercise timer</h1>
            <div style={{fontSize: '100px'}}>
               <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
                restart(restartExpirtyTimestamo());
            }}>restart</button>
        </div>
    );
}
export default MyTimer;
