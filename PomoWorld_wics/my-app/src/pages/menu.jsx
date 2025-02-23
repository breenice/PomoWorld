import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from 'lucide-react'; 

// Styles for the links
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '18px',
  display: 'block',
  padding: '10px 0',
};

const Menu = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
      {/* hover icon */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          backgroundColor: '#333',
          color: '#fff',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <MenuIcon size={24} />
      </div>

      {/* main menu */}
      {isOpen && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          style={{
            width: '200px',
            backgroundColor: '#333',
            color: '#fff',
            padding: '20px',
            position: 'absolute',
            top: '50px',
            right: '0',
            boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              <li><Link to="/location" style={linkStyle}>Location</Link></li>
              <li><Link to="/activity" style={linkStyle}>Activity</Link></li>
              <li><Link to="/" style={linkStyle}>Timer</Link></li>
              <li><Link to="/leaderboard" style={linkStyle}>Leaderboard</Link></li>
              <li><Link to="/profile" style={linkStyle}>Profile</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Menu;
