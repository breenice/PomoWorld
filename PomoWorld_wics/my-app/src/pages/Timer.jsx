import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Firebase config
import { collection, query, where, addDoc, doc, getDoc, getDocs } from 'firebase/firestore'; // Firestore functions
import Activity from './Activity';

const Timer = ({ menuOpen }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessionType, setSessionType] = useState('Work');
  const [workSessions, setWorkSessions] = useState(0);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [activity, setActivity] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [user, setUser] = useState(null);  // State to store user information
  const [userData, setUserData] = useState(null);  // Store fetched user data from Firestore
  const [userError, setUserError] = useState('');
  const [loadingUser, setLoadingUser] = useState(true); // Add loading state


  const fetchUserData = async (email) => {
    try {
      // Query the "users" collection where the email matches the authenticated user's email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email)); // Query by email
  
      // Get the query snapshot
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Assuming email is unique, use the first document
        const userDoc = querySnapshot.docs[0].data();
  
        // Set the user data state with the fetched data
        setUserData({
          firstName: userDoc.firstName,
          lastName: userDoc.lastName,
          email: userDoc.email,
          username: userDoc.username,
          createdAt: userDoc.createdAt?.toDate(),  // Convert Firestore Timestamp to Date object
        });
        setLoadingUser(false);
      } else {
        console.log('No user data found for this email');
        setLoadingUser(false);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserError('Failed to fetch user data');
      setLoadingUser(false);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoadingUser(true);
        fetchUserData(currentUser.email);
      } else {
        setUser(null);
        setLoadingUser(false);
        setUserError('No user is logged in');
      }
    });

    return () => unsubscribe();
  }, []);

  const calculateTotalSeconds = () => {
    return hours * 3600 + minutes * 60 + seconds;
  };

  useEffect(() => {
    let interval;
    if (running && calculateTotalSeconds() > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0 && minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 59;
          }
          return prev - 1;
        });

        setTotalTime((prevTotal) => prevTotal + 1); // Track total time
      }, 1000);
    } else if (calculateTotalSeconds() === 0 && running) {
      setRunning(false);
      switchSession();
      getActivity();
      getLocation();
      awardPoints();
    }
    return () => clearInterval(interval);
  }, [running, minutes, seconds, user]);

  const switchSession = () => {
    if (sessionType === 'Work') {
      if (workSessions < 3) {
        setSessionType('Short Break');
        setMinutes(5);
        setSeconds(0);
        setWorkSessions((prev) => prev + 1);
      } else {
        setSessionType('Long Break');
        setMinutes(15);
        setSeconds(0);
        setWorkSessions(0);
      }
    } else {
      setSessionType('Work');
      setMinutes(25);
      setSeconds(0);
    }
  };

  const resetTimer = () => {
    setSessionType('Work');
    setMinutes(25);
    setSeconds(0);
    setRunning(false);
    setTotalTime(0);  // Reset total time
  };

  const getActivity = () => {
    const savedActivity = localStorage.getItem('activity');
    if (savedActivity) {
      setActivity(savedActivity);
    } else {
      setActivity('Relaxing');
      localStorage.setItem('activity', 'Relaxing');
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
          setLocationError('Error fetching location');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  const awardPoints = () => {
    if (user && activity && location) {
      const points = totalTime;
      const activitiesRef = collection(db, 'activities');

      addDoc(activitiesRef, {
        activityName: activity,
        location,
        user: user.uid,  // Use user UID
        date: new Date(),
        points,
      })
        .then(() => {
          console.log('Activity with points saved to Firebase');
        })
        .catch((error) => {
          console.error('Error saving activity with points to Firebase:', error);
        });
    } else {
      console.error('Activity, Location, or User not found.');
    }
  };

  const startTimer = () => {
    getActivity();
    getLocation();
    setRunning(true);
  };

  // Conditionally render the UI based on whether the user is available
  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Loading...</h1>
        {userError && <p>{userError}</p>}
      </div>
    );
  }

  return (
    <div
      style={{
        marginLeft: menuOpen ? '200px' : '0',
        padding: '20px',
        flex: 1,
      }}
    >
      <h1>{activity}</h1>
      <div>
        <label>Minutes: </label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          min={1}
          style={{ width: '60px', marginRight: '10px' }}
          disabled={running}
        />
        <label>Seconds: </label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          min={0}
          max={59}
          style={{ width: '60px' }}
          disabled={running}
        />
      </div>

      {/* <p style={{ fontSize: '2rem', marginBottom: '20px' }}>
        Time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p> */}
      <p style={{ fontSize: '3rem', marginBottom: '20px' }}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>

      <button
        onClick={() => {
          if (!running) {
            startTimer();
          }
          setRunning(!running);
        }}
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

      {/* <button
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
      </button> */}

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

      {userError && <div style={{ color: 'red' }}>{userError}</div>}
    </div>
  );
};

export default Timer;
