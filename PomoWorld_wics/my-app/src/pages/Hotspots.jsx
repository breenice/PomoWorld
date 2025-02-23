import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { db } from "../firebase";

const Hotspots = () => {
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "activities"));
        const data = {};

        // Consolidate points by latitude and longitude
        querySnapshot.forEach((doc) => {
          const { latitude, longitude, points } = doc.data();
          const key = `${latitude},${longitude}`;

          if (!data[key]) {
            data[key] = { latitude, longitude, totalPoints: 0 };
          }

          data[key].totalPoints += points;
        });

        // Convert object to array and sort by totalPoints descending
        const sortedHotspots = Object.values(data)
          .sort((a, b) => b.totalPoints - a.totalPoints)
          .slice(0, 10);

        setHotspots(sortedHotspots);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Top 10 Hotspots</h2>
      <ul>
        {hotspots.map((spot, index) => (
          <li key={index}>
            Lat: {spot.latitude}, Lng: {spot.longitude}, Points: {spot.totalPoints}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hotspots;
