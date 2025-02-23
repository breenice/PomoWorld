import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; // Assuming firebase.js is set up
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import signOut
import { setPersistence, browserLocalPersistence } from "firebase/auth";

import duskCity from '../assets/studio_ghibli_city_night.jpg'

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
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
          await getUserPoints(user.uid);
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

  const getUserPoints = async (uid) => {
    try {
        const activitiesRef = collection(db, 'activities');
        const q = query(activitiesRef, where('user', '==', uid));

        const querySnapshot = await getDocs(q);
        let totalPoints = 0;

        querySnapshot.forEach((doc) => {
            totalPoints += doc.data().points;
        });

        setUserPoints(totalPoints);
    } catch (error) {
        console.error('error fethcing user points:', error);
    }
  }

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
    <div style={styles.background}>
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
        <div style={styles.infoItem}>
          <strong>Total Points:</strong> {userPoints}
        </div>
      </div>
      <button onClick={handleSignOut} style={styles.signOutButton}>Sign Out</button>
    </div>
    </div>
  );
};

// Simple inline styles for the profile page
const styles = {
  background: {
      backgroundImage: `url(${duskCity})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    border: '0px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f980',
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
