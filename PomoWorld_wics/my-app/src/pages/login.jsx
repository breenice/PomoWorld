// src/components/AuthPage.js
import React, { useState } from 'react';
import { auth, db } from '../firebase'; // Assuming firebase.js is properly set up
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import background from '../assets/animalbackground.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up forms
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Store username during sign up
  const [firstName, setFirstName] = useState(''); // Store first name
  const [lastName, setLastName] = useState(''); // Store last name
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle sign up and store user information in Firestore
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add additional user data to Firestore (username, first name, last name, etc.)
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: new Date(),
      });

      setError('');
      alert('Sign up successful');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      alert('Login successful');
      navigate('/')
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form
          style={styles.form}
          onSubmit={isLogin ? handleLogin : handleSignUp}
        >
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={styles.input}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.button}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={styles.toggleButton}
        >
          {isLogin
            ? 'Don’t have an account? Sign Up'
            : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

// Simple inline styles
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  toggleButton: {
    marginTop: '10px',
    backgroundColor: 'transparent',
    color: '#007BFF',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default AuthPage;
