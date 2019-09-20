import Button from '@material-ui/core/Button';
const React = require('react');
const ms = require('pretty-ms');


class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time: 0,
            isOn: false,
            start: 0
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }


    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        });
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);
    }

    stopTimer() {
        this.setState({isOn: false});
        clearInterval(this.timer)
    }

    resetTimer() {
        this.setState({time: 0, isOn: false})
    }

    render() {
        let start = (this.state.time === 0) ?
            <Button  onClick={this.startTimer}>start</Button> : null;
        let stop = (this.state.time === 0 || !this.state.isOn) ? null :
            <Button onClick={this.stopTimer}>stop</Button>;
        let resume = (this.state.time === 0 || this.state.isOn) ? null :
            <Button onClick={this.startTimer}>resume</Button>;
        let reset = (this.state.time === 0 || this.state.isOn) ? null :
            <Button onClick={this.resetTimer}>reset</Button>;

        return(
            <div>
                <h3>timer: {ms(this.state.time)}</h3>
                {start}
                {resume}
                {stop}
                {reset}
            </div>
    )}
}

export default Timer;
