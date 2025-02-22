import React, { useState, useEffect } from 'react';

const TimerWithMenu = () => {
  const pomodoro = 25 * 60;
  const shortBreak = 5 * 60;
  const longBreak = 15 * 60;
  
  const [seconds, setSeconds] = useState(pomodoro);
  const [running, setRunning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [sessionType, setSessionType] = useState('Work'); 
  const [workSessions, setWorkSessions] = useState(0);

  useEffect(() => {
    let interval;

    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      switchSession();
    }

    return () => clearInterval(interval);
  }, [running]);

  const switchSession = () => {
    if (sessionType === 'Work') {
      if (workSessions < 3){
        setSessionType('Short Break');
        setSeconds(shortBreak);
        setWorkSessions(prev => prev + 1);
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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const resetTimer = () => {
    setSessionType('Work');
    setSeconds(pomodoro);
    setRunning(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Side Menu */}
      {menuOpen && (
        <div
          style={{
            width: '200px',
            height: '100vh',
            backgroundColor: '#333',
            color: '#fff',
            padding: '20px',
            position: 'fixed',
            top: '0',
            right: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={toggleMenu}
            style={{
              backgroundColor: '#555',
              color: '#fff',
              padding: '10px',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            Toggle Menu
          </button>
          <nav>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ margin: '10px 0' }}>Home</li>
              <li style={{ margin: '10px 0' }}>Settings</li>
              <li style={{ margin: '10px 0' }}>About</li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
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
            backgroundColor: running ? '#e74c3c' : '#2ecc71',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
          }}
          >
            Reset
          </button>
      </div>
    </div>
  );
};

export default TimerWithMenu;
