import React, { useState, useEffect } from 'react'
import './Greetings.css'
import Greeting from '../../assets/waving-hand.png'

const Greetings = () => {

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {setDateTime(new Date());}, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const months =
        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
    };

    const formatTime = (date) => `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return (
    <div className="greetings">
        <div className="greet-phrases">
            <h1>Good Day, Pau!<img src={Greeting} className="greeting" alt="greeting" /></h1>
            <p> Admin / Dashboard </p>
        </div>
        <div className="dateTime">
            <h1 className="time">{formatTime(dateTime)}</h1>
            <p className="date">{formatDate(dateTime)}</p>
        </div>
    </div>
    
  )
}

export default Greetings
