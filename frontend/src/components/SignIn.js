// src/components/SignIn.js

import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({ setToken }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/signin', formData);
            setMessage('User signed in successfully');
            setToken(response.data.token);
        } catch (error) {
            setMessage(error.response.data.msg || 'Error occurred');
        }
    };

    return (
        <div className="container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SignIn;
