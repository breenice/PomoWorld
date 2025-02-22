import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState(null);
  const API_KEY = "AIzaSyDdTjmXRPhynZZ6cA9EZH_bV1Ud43dE3DE"; // Replace with your API key

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // geocoding with maps api call
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
            );
            setLocation(response.data.results[0].formatted_address);
          } catch (error) {
            console.error("Error fetching location", error);
          }
        },
        (error) => {
          console.error("Error getting user location", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h1>Your Location</h1>
      <p>{location ? location : "Fetching location..."}</p>
    </div>
  );
}

export default App;

