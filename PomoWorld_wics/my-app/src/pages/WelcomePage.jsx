import React from 'react';
import background from '../assets/animalbackground.png';

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
  };

const WelcomePage = () => {
  return (
    <div style={styles.background}>
        <div style={styles.container}>
            <h1>Welcome to Pomo World!</h1>
        </div>
    </div>
  );
};

export default WelcomePage;
