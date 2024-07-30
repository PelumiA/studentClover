// src/components/Profile.js

import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({
        email: '',
        password: '',
        name: '',
        school: '',
        typeOfSchool: '',
        amountNeeded: '',
        bio: '',
        age: '',
        race: '',
        gender: '',
        profilePic: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleProfileSubmit = async () => {
        try {
            const signupResponse = await axios.post('http://localhost:5000/api/users/signup', {
                email: profile.email,
                password: profile.password
            });

            if (signupResponse.data.msg !== 'User registered successfully') {
                setMessage(signupResponse.data.msg);
                return;
            }

            const profileResponse = await axios.post('http://localhost:5000/api/users/profile', {
                email: profile.email,
                profile: {
                    name: profile.name,
                    school: profile.school,
                    typeOfSchool: profile.typeOfSchool,
                    amountNeeded: profile.amountNeeded,
                    bio: profile.bio,
                    age: profile.age,
                    race: profile.race,
                    gender: profile.gender,
                    profilePic: profile.profilePic
                }
            });

            setMessage(profileResponse.data.msg);
        } catch (error) {
            setMessage(error.response.data.msg || 'Error occurred');
        }
    };

    return (
        <div className="container">
            <h2>Create Profile</h2>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={profile.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="school"
                    value={profile.school}
                    onChange={handleInputChange}
                    placeholder="School"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="typeOfSchool"
                    value={profile.typeOfSchool}
                    onChange={handleInputChange}
                    placeholder="Type of School"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="amountNeeded"
                    value={profile.amountNeeded}
                    onChange={handleInputChange}
                    placeholder="Amount Needed"
                />
            </div>
            <div className="form-group">
                <textarea
                    className="form-control"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    placeholder="Bio"></textarea>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="age"
                    value={profile.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="race"
                    value={profile.race}
                    onChange={handleInputChange}
                    placeholder="Race"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="gender"
                    value={profile.gender}
                    onChange={handleInputChange}
                    placeholder="Gender"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="profilePic"
                    value={profile.profilePic}
                    onChange={handleInputChange}
                    placeholder="Profile Picture URL"
                />
            </div>
            <button className="btn btn-primary" onClick={handleProfileSubmit}>Create Profile</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;
