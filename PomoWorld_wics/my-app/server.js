import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; 

app.get("/hubs", async (req, res) => {
  try {
    const { lat, lng, type } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching places:", error.message);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
