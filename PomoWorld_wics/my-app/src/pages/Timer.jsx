// src/components/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = ({ menuOpen }) => {
  const pomodoro = 25 * 60;
  const shortBreak = 5 * 60;
  const longBreak = 15 * 60;

  const [seconds, setSeconds] = useState(pomodoro);
  const [running, setRunning] = useState(false);
  const [sessionType, setSessionType] = useState('Work');
  const [workSessions, setWorkSessions] = useState(0);

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
  );
};

export default Timer;


// import React, { useState, useEffect } from 'react';

// const Timer = ({ menuOpen }) => {
//   const pomodoro = 25 * 60;
//   const shortBreak = 5 * 60;
//   const longBreak = 15 * 60;

//   const [seconds, setSeconds] = useState(pomodoro);
//   const [running, setRunning] = useState(false);
//   const [sessionType, setSessionType] = useState('Work');
//   const [workSessions, setWorkSessions] = useState(0);

//   useEffect(() => {
//     let interval;

//     if (running && seconds > 0) {
//       interval = setInterval(() => {
//         setSeconds((prev) => prev - 1);
//       }, 1000);
//     } else if (seconds === 0) {
//       switchSession();
//     }

//     return () => clearInterval(interval);
//   }, [running, seconds]);

//   const switchSession = () => {
//     if (sessionType === 'Work') {
//       if (workSessions < 3) {
//         setSessionType('Short Break');
//         setSeconds(shortBreak);
//         setWorkSessions((prev) => prev + 1);
//       } else {
//         setSessionType('Long Break');
//         setSeconds(longBreak);
//         setWorkSessions(0);
//       }
//     } else {
//       setSessionType('Work');
//       setSeconds(pomodoro);
//     }
//     setRunning(true);
//   };

//   const resetTimer = () => {
//     setSessionType('Work');
//     setSeconds(pomodoro);
//     setRunning(false);
//   };

//   const startTimer = () => {
//     // Retrieve location and activity from chrome.storage.local
//     chrome.storage.local.get(['location', 'activity', 'user'], (result) => {
//       if (result.location && result.activity && result.user) {
//         const startTime = Date.now(); // Record start time
//         const timerData = {
//           user: result.user,
//           location: result.location,
//           activity: result.activity,
//           startTime: startTime,
//           endTime: null,
//         };

//         // Save the timer start info in chrome.storage.local
//         chrome.storage.local.set({ timerSession: timerData }, () => {
//           console.log('Timer session started and saved.');
//         });
//       } else {
//         console.log('Error: Missing location, activity, or user data.');
//       }
//     });

//     setRunning(true);
//   };

//   const endTimer = () => {
//     // Retrieve timer data and calculate end time
//     chrome.storage.local.get(['timerSession'], (result) => {
//       if (result.timerSession) {
//         const endTime = Date.now(); // Record end time

//         // Update the timer data with the end time
//         const updatedSession = {
//           ...result.timerSession,
//           endTime: endTime,
//         };

//         // Save the updated timer data to chrome.storage.local (or to a database)
//         chrome.storage.local.set({ timerSession: updatedSession }, () => {
//           console.log('Timer session ended and saved with end time.');
//           // Optionally, send data to backend for persistent storage
//         });
//       } else {
//         console.log('Error: No active timer session found.');
//       }
//     });

//     setRunning(false);
//   };

//   return (
//     <div
//       style={{
//         marginLeft: menuOpen ? '200px' : '0',
//         padding: '20px',
//         flex: 1,
//       }}
//     >
//       <h1>Timer</h1>
//       <p style={{ fontSize: '2rem', marginBottom: '20px' }}>
//         Time: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
//       </p>
//       <button
//         onClick={startTimer}
//         style={{
//           backgroundColor: running ? '#e74c3c' : '#2ecc71',
//           color: '#fff',
//           padding: '10px 20px',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         {running ? 'Pause' : 'Start'}
//       </button>
//       <button
//         onClick={endTimer}
//         style={{
//           backgroundColor: '#e74c3c',
//           color: '#fff',
//           padding: '10px 20px',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         End Timer
//       </button>
//       <button
//         onClick={resetTimer}
//         style={{
//           backgroundColor: '#f39c12',
//           color: '#fff',
//           padding: '10px 20px',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         Reset
//       </button>
//     </div>
//   );
// };

// export default Timer;
