// src/pages/Activity.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Activity = () => {
  const [activity, setActivity] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const navigateToTimer = () => {
    // Passing both location and activity to the Timer page
    navigate('/timer', { state: { location: location.state.location, activity } });
  };

  return (
    <div>
      <h1>Activity Page</h1>
      <p>Location: {location.state.location}</p>
      <div>
        <label htmlFor="activity">Select Activity: </label>
        <input
          type="text"
          id="activity"
          value={activity}
          onChange={handleActivityChange}
          placeholder="Enter Activity"
        />
      </div>
      <button onClick={navigateToTimer} disabled={!activity}>
        Go to Timer
      </button>
    </div>
  );
};

export default Activity;
