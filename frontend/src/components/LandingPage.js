// src/components/LandingPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LandingPage.css';

const LandingPage = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [rejectedUsers, setRejectedUsers] = useState([]);
    const [acceptedUsers, setAcceptedUsers] = useState([]);

    useEffect(() => {
        fetchRandomUser();
    }, []);

    const fetchRandomUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/random');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching random user:', error);
        }
    };

    // This ensures that only unseen/new users are fetched
    const fetchRandomUserNoRepeats = async () => {
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

    const handleSwipeRight = () => {
        setAcceptedUsers([...acceptedUsers, user._id]);
        setMessage(`You accepted ${user.profile.name}`);
        fetchRandomUser();
    };

    const handleSwipeLeft = () => {
        setRejectedUsers([...rejectedUsers, user._id]);
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
