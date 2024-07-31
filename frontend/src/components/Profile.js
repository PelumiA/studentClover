// src/components/Profile.js

import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Student', // Default role
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
        setFormData({ ...formData, [name]: value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        try {
            const signupResponse = await axios.post('http://localhost:5000/api/users/signup', {
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            if (signupResponse.data.token) {
                if (formData.role === 'Student') {
                    const profileResponse = await axios.post('http://localhost:5000/api/users/profile', {
                        email: formData.email,
                        profile: {
                            name: formData.name,
                            school: formData.school,
                            typeOfSchool: formData.typeOfSchool,
                            amountNeeded: formData.amountNeeded,
                            bio: formData.bio,
                            age: formData.age,
                            race: formData.race,
                            gender: formData.gender,
                            profilePic: formData.profilePic
                        }
                    });
                    setMessage('Profile created successfully');
                } else {
                    const sponsorProfileResponse = await axios.post('http://localhost:5000/api/users/profile', {
                        email: formData.email,
                        profile: {
                            name: formData.name,
                            profilePic: formData.profilePic
                        }
                    });
                    setMessage('Sponsor registered successfully');
                }
            }
        } catch (error) {
            setMessage(error.response.data.msg || 'Error occurred');
        }
    };

    return (
        <div className="container">
            <h2>Create Profile</h2>
            <form onSubmit={handleProfileSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
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
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="form-group">
                    <select
                        name="role"
                        className="form-control"
                        value={formData.role}
                        onChange={handleInputChange}
                    >
                        <option value="Student">Student</option>
                        <option value="Sponsor">Sponsor</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="profilePic"
                        value={formData.profilePic}
                        onChange={handleInputChange}
                        placeholder="Profile Picture URL"
                        required
                    />
                </div>
                {formData.role === 'Student' && (
                    <>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="school"
                                value={formData.school}
                                onChange={handleInputChange}
                                placeholder="School"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="typeOfSchool"
                                value={formData.typeOfSchool}
                                onChange={handleInputChange}
                                placeholder="Type of School"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="amountNeeded"
                                value={formData.amountNeeded}
                                onChange={handleInputChange}
                                placeholder="Amount Needed"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Bio"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="Age"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="race"
                                value={formData.race}
                                onChange={handleInputChange}
                                placeholder="Race"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                placeholder="Gender"
                            />
                        </div>
                    </>
                )}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;
