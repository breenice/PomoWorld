import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [hubs, setHubs] = useState([]); // hubs: useState array of places to show that can accumulate points
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
            setLocation(response.data.results[0]?.formatted_address || "Unknown Location");

            const hubtypes = "cafe";
            const hubResponse = await axios.get(`http://localhost:5000/hubs`, {
              params: {
                lat: latitude,
                lng: longitude,
                type: "cafe",
              },
            });
            console.log("API Response:", hubResponse.data);
            setHubs(hubResponse.data.results || []);  
          } catch (error) {
            console.error("Error fetching location", error);
          }
        },
        (error) => {
          console.error("Error getting user location", error);
          setError(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h1>Current Location</h1>
      <p>{location ? location : "Fetching location..."}</p>
      <h1>Learning Hubs</h1>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
     <ul>
        {hubs.map((hub) => ( // (iterates and maps them to JSX elements)
          <li key={hub.id}>
            {console.log(hub)}
            {hub.name} - {hub.vicinity}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;

