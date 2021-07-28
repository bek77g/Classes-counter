import React, { Component } from 'react'
import Timer from './Timer';
import "./App.css"

export class Counter extends Component {
    state = {
        currentTimeMs: window.localStorage.getItem('currentTimeMs') ? JSON.parse(window.localStorage.getItem('currentTimeMs')) : 0,
        currentTimeSec: window.localStorage.getItem('currentTimeSec') ? JSON.parse(window.localStorage.getItem('currentTimeSec')) : 0,
        currentTimeMin: window.localStorage.getItem('currentTimeMin') ? JSON.parse(window.localStorage.getItem('currentTimeMin')) : 0,
        running: window.localStorage.getItem('running') ? JSON.parse(window.localStorage.getItem('running')) : false
    };

    formatTime = (val) => {
        let value = val.toString();
        if (value.length < 2) value = "0" + value
        return value;
    };

    componentDidMount() {
        if (this.state.running) {
            this.watch = setInterval(() => this.pause(), 10)
        }
    }

    componentDidUpdate() {
        localStorage.setItem('currentTimeMs', this.state.currentTimeMs);
        localStorage.setItem('currentTimeSec', this.state.currentTimeSec);
        localStorage.setItem('currentTimeMin', this.state.currentTimeMin);
        localStorage.setItem('running', this.state.running)
    }

    startBtn = () => {
        if (!this.state.running) {
            this.setState({ running: true });
            this.watch = setInterval(() => this.pause(), 10);
          }
    };

    stopBtn = () => {
        this.setState({ running: false });
        clearInterval(this.watch);
    };

    pause = () => {
        this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
        if (this.state.currentTimeMs >= 1000) {
          this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
          this.setState({ currentTimeMs: 0 });
        }
        else if (this.state.currentTimeSec >= 60) {
          this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
          this.setState({ currentTimeSec: 0 });
        }
    };

    resetTime = () => {
        this.stopBtn();
        this.setState({
          currentTimeMs: 0,
          currentTimeSec: 0,
          currentTimeMin: 0,
        });
    };

    render() {
        return (
            <div className="AppDiv">
                <h1>Timer</h1>
                <Timer {...this.state} formatTime={this.formatTime}/>
                <div className="App__btns">
                    {!this.state.running
                    ? <button className="btn btn-success" onClick={this.startBtn}>START</button>
                    : <button className="btn btn-warning" onClick={this.stopBtn}>PAUSE</button>}
                    <button className="btn btn-danger" onClick={this.resetTime}>RESET</button>
                </div>
            </div>
        )
    }
}

export default Counter
