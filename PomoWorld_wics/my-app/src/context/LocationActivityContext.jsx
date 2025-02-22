// src/context/LocationActivityContext.js
import React, { createContext, useState, useContext } from 'react';

const LocationActivityContext = createContext();

export const useLocationActivity = () => {
  return useContext(LocationActivityContext);
};

export const LocationActivityProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [activity, setActivity] = useState("Default Activity"); // Default value for activity

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  const updateActivity = (newActivity) => {
    setActivity(newActivity);
  };

  return (
    <LocationActivityContext.Provider
      value={{ location, activity, updateLocation, updateActivity }}
    >
      {children}
    </LocationActivityContext.Provider>
  );
};
