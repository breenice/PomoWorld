import React, { useState, useEffect } from 'react';

const Activity = () => {
  const [activityName, setActivityName] = useState('');
  const [savedActivity, setSavedActivity] = useState(''); // Default to empty string
  const [isEditing, setIsEditing] = useState(false); // Flag to track if the user is editing
  const [message, setMessage] = useState('');

  // Retrieve saved activity from localStorage when the component mounts
  useEffect(() => {
    const saved = localStorage.getItem('activity');
    if (saved) {
      setSavedActivity(saved); // If activity is found in localStorage, use it
      setActivityName(saved); // Also set the state to reflect the saved activity
    } else {
      setSavedActivity('Relaxing'); // Default to 'Relaxing' if no saved activity
      setActivityName('Relaxing');
    }
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    setActivityName(event.target.innerText); // Update the activityName state as the user types
  };

  // Save the activity
  const handleSaveActivity = () => {
    if (activityName.trim() === '') {
      alert('Please enter a valid activity name.');
      return;
    }

    // Save the activity to localStorage
    localStorage.setItem('activity', activityName);
    setSavedActivity(activityName); // Update the saved activity in state
    setMessage(`Current Activity: ${activityName}`); // Update subtitle directly
    setIsEditing(false); // Exit editing mode
  };

  // Handle pressing the Enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSaveActivity(); // Save when Enter is pressed
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Editable Activity Name Display */}
        <h2
          onClick={() => {
            if (!isEditing) {
              setIsEditing(true); // Enable editing on click
            }
          }}
          style={{
            ...styles.activityHeader,
            color: isEditing ? '#888' : 'black', // Lighter grey color while editing
            cursor: isEditing ? 'text' : 'pointer', // Change cursor when editing
          }}
          contentEditable={isEditing}
          onInput={handleInputChange} // Update activity name when user types
          onKeyDown={handleKeyDown} // Handle Enter key press
          suppressContentEditableWarning={true} // Prevent warning about contentEditable
        >
          {activityName}
        </h2>

        {/* Current Activity Subtitle */}
        <p style={styles.subtitle}>Current Activity</p>

        {/* Message Confirmation */}
        {message && (
          <p style={styles.message}>{message}</p> // Directly update the message below the subtitle
        )}
      </div>
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
  activityHeader: {
    fontSize: '2rem', // Larger font for the activity name
    fontWeight: 'bold',
    transition: 'color 0.3s ease', // Smooth transition on color change
    borderBottom: '2px solid #000', // Thin crisp underline
    paddingBottom: '3px', // Reduced space between line and text
    textAlign: 'left', // Left-align the activity name
    minHeight: '2rem', // Ensure text stays within a specific height
    outline: 'none', // Remove outline when in edit mode
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
    marginTop: '5px',
    textAlign: 'left', // Left-align subtitle as well
  },
  message: {
    fontSize: '1rem',
    color: '#155724',
    marginTop: '5px',
    textAlign: 'left', // Align the message text to the left
  },
};

export default Activity;
