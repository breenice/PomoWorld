// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';  // Import AuthProvider

import PrivateRoute from './components/PrivateRoute.jsx';  // Private route to protect pages

import AuthPage from './pages/login.jsx'; // The page with login/sign up forms
import Timer from './pages/Timer.jsx'; // An example home page for logged-in users
import MyLocation from './pages/Location.jsx';
import Menu from './pages/Menu.jsx';
// import Leaderboard from './pages/Leaderboard.jsx';
import Activity from './pages/Activity.jsx';
import ProfilePage from './pages/Profile.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Menu />
          <div>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />

              <Route path="/" element={<Timer />} />
              <Route path="/location" element={<MyLocation />} />
              {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
              <Route path="/activity" element={<Activity />} />
              <Route path="/profile" element={<ProfilePage />} />

              <Route path="/" element={<Timer />} />
            </Routes>
          </div>
          
        </div>
      </Router>
    </AuthProvider>
    
  );
}

export default App;