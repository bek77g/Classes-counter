import React from 'react'

const SecondTimerNumbers = (props) => {
    return (
        <span>
          {props.formatTime(props.currentTimeMin)}:
          {props.formatTime(props.currentTimeSec)}:
          {props.formatTime(props.currentTimeMs)}
        </span>
    )
}

export default SecondTimerNumbers
