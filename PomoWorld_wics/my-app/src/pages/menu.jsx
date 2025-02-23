// src/components/RightMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div
      style={{
        width: '200px',
        height: '100vh',
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        position: 'fixed',
        top: '0',
        right: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly', // Ensure links are spaced evenly
        boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <nav>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li>
            <Link to="/location" style={linkStyle}>Location</Link>
          </li>
          <li>
            <Link to="/activity" style={linkStyle}>Activity</Link>
          </li>
          <li>
            <Link to="/" style={linkStyle}>Timer</Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to="/leaderboard" style={linkStyle}>Leaderboard</Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link to="/profile" style={linkStyle}>Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// Styles for the links
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '18px',
  display: 'block',
  padding: '10px 0',
};

export default Menu;
