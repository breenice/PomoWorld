import React, { useState, useEffect } from 'react';

const Timer = ({ menuOpen }) => {
  const pomodoro = 25 * 60;
  const shortBreak = 5 * 60;
  const longBreak = 15 * 60;

  const [seconds, setSeconds] = useState(pomodoro);
  const [running, setRunning] = useState(false);
  const [sessionType, setSessionType] = useState('Work');
  const [workSessions, setWorkSessions] = useState(0);
  const [location, setLocation] = useState(null);  // State to store location
  const [locationError, setLocationError] = useState(null);  // To store location errors

  const [activity, setActivity] = useState(null);

  useEffect(() => {
    let interval;

    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      switchSession();
    }

    return () => clearInterval(interval);
  }, [running, seconds]);

  const switchSession = () => {
    if (sessionType === 'Work') {
      if (workSessions < 3) {
        setSessionType('Short Break');
        setSeconds(shortBreak);
        setWorkSessions((prev) => prev + 1);
      } else {
        setSessionType('Long Break');
        setSeconds(longBreak);
        setWorkSessions(0);
      }
    } else {
      setSessionType('Work');
      setSeconds(pomodoro);
    }
    setRunning(true);
  };

  const resetTimer = () => {
    setSessionType('Work');
    setSeconds(pomodoro);
    setRunning(false);
  };

  const getActivity = () => {
    const savedActivity = localStorage.getItem('activity');
    if (savedActivity) {
      setActivity(savedActivity); // Set the saved activity into state
    } else {
      // If no activity is saved, default to 'Relaxing'
      setActivity('Relaxing');
      localStorage.setItem('activity', 'Relaxing'); // Optionally store the default activity in localStorage
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log("Location fetched: ", { latitude, longitude });
        },
        (error) => {
          setLocationError("Error fetching location");
          console.error(error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const startTimer = () => {
    getActivity();
    getLocation();
    setRunning(true);
  };

  return (
    <div
      style={{
        marginLeft: menuOpen ? '200px' : '0',
        padding: '20px',
        flex: 1,
      }}
    >
      <h1>Timer</h1>
      <p style={{ fontSize: '2rem', marginBottom: '20px' }}>
        Time: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </p>

      <button
        onClick={() => setRunning(!running)}
        style={{
          backgroundColor: running ? '#e74c3c' : '#2ecc71',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {running ? 'Pause' : 'Start'}
      </button>
      
      <button
        onClick={resetTimer}
        style={{
          backgroundColor: '#f39c12',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Reset
      </button>

      {/* Add a button to trigger location fetching */}
      <button
        onClick={getLocation}
        style={{
          backgroundColor: '#3498db',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        Get Current Location
      </button>

      {/* Display the location or error */}
      {location && (
        <div>
          <h3>Current Location:</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}

      {locationError && (
        <div style={{ color: 'red' }}>
          <h3>{locationError}</h3>
        </div>
      )}
    </div>
  );
};

export default Timer;
