import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Assuming firebase.js is set up
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import { setPersistence, browserLocalPersistence } from "firebase/auth";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up the observer for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // If the user is not logged in, redirect to /auth
        setError("User is not authenticated.");
        navigate('/auth');
      }

      // If the user is logged in, fetch their data
      try {
        const docRef = doc(db, 'users', user.uid); // Get user's document from Firestore
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setError("No user data found.");
        }
      } catch (err) {
        setError('Failed to fetch user data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    // Clean up the observer when the component is unmounted
    return () => unsubscribe();
  }, [navigate]);

  // Sign out function
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/auth'); // Redirect to login page after sign-out
    } catch (err) {
      setError('Error signing out.');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Profile</h1>
      <div style={styles.infoContainer}>
        <div style={styles.infoItem}>
          <strong>First Name:</strong> {userData.firstName}
        </div>
        <div style={styles.infoItem}>
          <strong>Last Name:</strong> {userData.lastName}
        </div>
        <div style={styles.infoItem}>
          <strong>Username:</strong> {userData.username}
        </div>
        <div style={styles.infoItem}>
          <strong>Email:</strong> {userData.email}
        </div>
      </div>
      <button onClick={handleSignOut} style={styles.signOutButton}>Sign Out</button>
    </div>
  );
};

// Simple inline styles for the profile page
const styles = {
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  infoContainer: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  infoItem: {
    marginBottom: '10px',
    fontSize: '16px',
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
  signOutButton: {
    padding: '10px',
    backgroundColor: '#FF4C4C',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default ProfilePage;
