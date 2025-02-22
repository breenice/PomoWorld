import React, { useState } from 'react';

const Activity = () => {
  const [activityName, setActivityName] = useState(''); // State for activity name
  const [savedActivity, setSavedActivity] = useState(null); // State to store saved activity
  const [message, setMessage] = useState(''); // State to show confirmation message

  // Handle input change
  const handleInputChange = (event) => {
    setActivityName(event.target.value);
  };

  // Save the activity
  const handleSaveActivity = () => {
    if (activityName.trim() === '') {
      alert('Please enter a valid activity name.');
      return;
    }

    // Save activity name to localStorage
    localStorage.setItem('activity', activityName);
    console.log('Activity saved: ', activityName);
    setSavedActivity(activityName); // Update saved activity in state
    setActivityName(''); // Clear input field
    setMessage('Activity has been saved successfully!'); // Show success message
  };

  // Retrieve saved activity from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('activity');
    if (saved) {
      setSavedActivity(saved);
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1>Activity Page</h1>
      <div style={styles.formContainer}>
        <input
          type="text"
          value={activityName}
          onChange={handleInputChange}
          placeholder="Enter activity name"
          style={styles.input}
        />
        <button
          onClick={handleSaveActivity}
          style={styles.saveButton}
        >
          Save Activity
        </button>
      </div>

      {message && (
        <div style={styles.messageContainer}>
          <p>{message}</p>
        </div>
      )}

      {savedActivity && (
        <div style={styles.savedActivityContainer}>
          <h3>Saved Activity:</h3>
          <p>{savedActivity}</p>
        </div>
      )}
    </div>
  );
};

// Inline styles for the Activity page
const styles = {
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    width: '80%',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  saveButton: {
    padding: '10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  savedActivityContainer: {
    marginTop: '20px',
    backgroundColor: '#e9f7fd',
    padding: '10px',
    borderRadius: '4px',
  },
  messageContainer: {
    marginTop: '20px',
    backgroundColor: '#d4edda',
    padding: '10px',
    borderRadius: '4px',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
};

export default Activity;
