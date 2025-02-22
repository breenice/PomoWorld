import { useState, useEffect } from "react";
import axios from "axios";

const MyLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
//   const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; // Store your API key in environment variables for better security (.env file)
  const API_KEY = "AIzaSyDdTjmXRPhynZZ6cA9EZH_bV1Ud43dE3DE";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
            );
            if (response.data.results.length > 0) {
              setLocation(response.data.results[0].formatted_address);
            } else {
              setError("Unable to find location.");
            }
          } catch (error) {
            setError("Error fetching location data.");
            console.error("Error fetching location", error);
          }
        },
        (error) => {
          setError("Error getting user location.");
          console.error("Error getting user location", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [API_KEY]);

  return (
    <div>
      <h1>Your Location</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{location ? location : "Fetching location..."}</p>
      )}
    </div>
  );
};

export default MyLocation;
