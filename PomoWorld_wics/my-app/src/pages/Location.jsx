import { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import background from '../assets/forest.png';

const styles = {
  background: {
    backgroundImage: `url(${background})`,
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
}
const MyLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [hubs, setHubs] = useState([]); // hubs: useState array of places to show that can accumulate points
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const API_KEY = "AIzaSyDdTjmXRPhynZZ6cA9EZH_bV1Ud43dE3DE"; // Replace with your API key

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });

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
    <div style = {styles.background}>
      <div style={styles.container}>
        <h1 style = {styles.title}>Current Location</h1>
        <p>{location ? location : "Fetching location..."}</p>
        <h1>Learning Hubs</h1>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <ul>
          {hubs.slice(0, 5).map((hub) => (
            <li key={hub.id}>
              {console.log(hub)}
              {hub.name} - {hub.vicinity}
            </li>
          ))}
        </ul>
        <div style = {{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <LoadScript googleMapsApiKey={API_KEY}>
          <div style={{ 
            width: "100%", 
            height: "400px", 
            maxWidth: "600px",  
            borderRadius: "10px", // round corners
            overflow: "hidden"
          }}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={coords}
              zoom={14}
            >
              {/* current location marker */}
              <Marker position={coords} label="You" />

              {/* learning hub markers */}
              {hubs.map((hub) => (
                <Marker
                  key={hub.id}
                  position={{ lat: hub.geometry.location.lat, lng: hub.geometry.location.lng }}
                  title={hub.name}
                />
              ))}
            </GoogleMap>
            </div>
          </LoadScript>
        </div>
      </div>
    </div>
  );
  }

  export default MyLocation;
