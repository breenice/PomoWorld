import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Import the firestore database
import { useTable } from 'react-table';
import { collection, getDocs, query, where } from "firebase/firestore"; // Firebase modular functions
import "./Leaderboard.css";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
          try {
            // Fetch all users
            const usersSnapshot = await getDocs(collection(db, "users"));
            const users = usersSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            // Fetch activities and calculate total points for each user
            const leaderboardData = await Promise.all(
              users.map(async (user) => {
                const activitiesQuery = query(
                  collection(db, "activities"),
                  where("user", "==", user.id)
                );
                const activitiesSnapshot = await getDocs(activitiesQuery);
                const totalPoints = activitiesSnapshot.docs.reduce(
                  (sum, doc) => sum + (doc.data().points || 0),
                  0
                );
                return {
                  userId: user.id,
                  username: user.username,
                  totalPoints,
                };
              })
            );
    
            // total points in descending order
            leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);
    
            // top 10 users
            setLeaderboard(leaderboardData.slice(0, 10));
            setLoading(false);
          } catch (error) {
            console.error("Error fetching leaderboard:", error);
            setLoading(false);
          }
        };
    
        fetchLeaderboard();
      }, []);

      const columns = React.useMemo(
        () => [
          { Header: "Rank", accessor: "rank" },
          { Header: "Username", accessor: "username" },
          { Header: "Total Points", accessor: "totalPoints" },
        ],
        []
      );

      const data = leaderboard.map((user, index) => ({
        rank: index + 1,
        username: user.username,
        totalPoints: user.totalPoints,
      }));

      const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <h1>Leaderboard</h1>
            </div>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={user.userId}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.totalPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

