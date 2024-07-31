// src/components/LandingPage.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import './LandingPage.css';

const LandingPage = () => {
    const { token, role } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [rejectedUsers, setRejectedUsers] = useState([]);
    const [acceptedUsers, setAcceptedUsers] = useState([]);

    useEffect(() => {
        fetchUserLists();
        fetchRandomUser();
    }, [token]);

    const fetchUserLists = async () => {
        if (role === 'Sponsor' && token) {
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAcceptedUsers(response.data.acceptedUsers || []);
                setRejectedUsers(response.data.rejectedUsers || []);
            } catch (error) {
                console.error('Error fetching user lists:', error);
            }
        }
    };

    const fetchRandomUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/random');
            const newUser = response.data;

            // If the user has been accepted or rejected, fetch another user
            if (rejectedUsers.includes(newUser._id) || acceptedUsers.includes(newUser._id)) {
                fetchRandomUser();
            } else {
                setUser(newUser);
            }
        } catch (error) {
            console.error('Error fetching random user:', error);
        }
    };

    const handleSwipeRight = async () => {
        if (role === 'Sponsor' && token) {
            try {
                await axios.put(`http://localhost:5000/api/users/accept/${user._id}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAcceptedUsers([...acceptedUsers, user._id]);
            } catch (error) {
                console.error('Error accepting user:', error);
            }
        }
        setMessage(`You accepted ${user.profile.name}`);
        fetchRandomUser();
    };

    const handleSwipeLeft = async () => {
        if (role === 'Sponsor' && token) {
            try {
                await axios.put(`http://localhost:5000/api/users/reject/${user._id}`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRejectedUsers([...rejectedUsers, user._id]);
            } catch (error) {
                console.error('Error rejecting user:', error);
            }
        }
        setMessage(`You rejected ${user.profile.name}`);
        fetchRandomUser();
    };

    return (
        <div className="container">
            <h2>Welcome to StudentClover</h2>
            {user ? (
                <div className="user-card">
                    <img
                        src={user.profile?.profilePic || 'https://via.placeholder.com/200'}
                        alt="Profile"
                        className="avatar"
                    />
                    <div>
                        <h5>{user.profile?.name || 'No Name Provided'}</h5>
                        <p>School: {user.profile?.school || 'No School Provided'}</p>
                        <p>Type of School: {user.profile?.typeOfSchool || 'No Type Provided'}</p>
                        <p>Amount Needed: {user.profile?.amountNeeded || 'No Amount Provided'}</p>
                        <p>Bio: {user.profile?.bio || 'No Bio Provided'}</p>
                        <div className="buttons">
                            <button className="btn btn-danger" onClick={handleSwipeLeft}>Swipe Left</button>
                            <button className="btn btn-primary" onClick={handleSwipeRight}>Swipe Right</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default LandingPage;
