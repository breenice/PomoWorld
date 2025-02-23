import React, { useState, useEffect } from 'react';
import lofiGirl from '../assets/lofi_girl.jpg'; // Import the image

const Activity = () => {
  const [activityName, setActivityName] = useState('');
  const [savedActivity, setSavedActivity] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('activity') || 'Relaxing';
    setSavedActivity(saved);
    setActivityName(saved);
  }, []);

  const handleInputChange = (event) => {
    setActivityName(event.target.value);
  };

  const handleSaveActivity = () => {
    if (activityName.trim() === '') {
      alert('Please enter a valid activity name.');
      return;
    }
    localStorage.setItem('activity', activityName);
    setSavedActivity(activityName);
    setMessage(`Current Activity: ${activityName}`);
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleSaveActivity();
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h2 style={styles.title}>Activity</h2>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={activityName}
            onChange={handleInputChange}
            onFocus={() => setIsEditing(true)}
            onBlur={handleSaveActivity}
            onKeyDown={handleKeyDown}
            style={{
              ...styles.input,
              borderBottom: isEditing ? '2px solid #007BFF' : '2px solid transparent',
            }}
          />
        </div>
        {/* <p style={styles.subtitle}>Current Activity</p> */}
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: `url(${lofiGirl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    // maxWidth: '400px',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white for better readability
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: '5px',
    width: '100%',
    textAlign: 'center',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    transition: 'border-bottom 0.3s ease',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    marginTop: '10px',
  },
  message: {
    fontSize: '1rem',
    color: '#007BFF',
    marginTop: '5px',
  },
};

export default Activity;
