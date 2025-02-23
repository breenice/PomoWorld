// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // Import AuthProvider

import AuthPage from './pages/login.jsx';
import Timer from './pages/Timer.jsx'; 
import MyLocation from './pages/Location.jsx';
import Menu from './pages/Menu.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Activity from './pages/Activity.jsx';
import ProfilePage from './pages/Profile.jsx';
import WelcomePage from './pages/WelcomePage.jsx';

import Hotspots from './pages/Hotspots.jsx';

import "./App.css";

function App() {
  const [hasClicked, setHasClicked] = useState(false);
  return (
    <AuthProvider>
      <Router>
        <div>
          <Menu setHasClicked={setHasClicked}/>
        
          <div style={{ marginRight: '400px', width: '100%' }}>
            {!hasClicked && <WelcomePage />}
          </div>
          <div style={{ marginRight: '400px', width: '100%' }}>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={<Timer />} />
              <Route path="/location" element={<MyLocation />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/hotspots" element={<Hotspots />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
