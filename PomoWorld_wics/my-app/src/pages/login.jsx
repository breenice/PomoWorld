// src/components/AuthPage.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Assuming firebase.js is properly set up
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up forms
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      alert('Login successful');
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError('');
      alert('Sign up successful');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form
        style={styles.form}
        onSubmit={isLogin ? handleLogin : handleSignUp}
      >
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
  );
};

// Simple inline styles
const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
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
