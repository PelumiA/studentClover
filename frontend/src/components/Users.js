// src/components/Users.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Users.css'; // Ensure you import the CSS if you have a separate CSS file for Users component

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        race: '',
        gender: '',
        school: '',
        typeOfSchool: ''
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/all', {
                    params: { search }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [search]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredUsers = users.filter(user => {
        return (
            (filters.race ? user.profile?.race === filters.race : true) &&
            (filters.gender ? user.profile?.gender === filters.gender : true) &&
            (filters.school ? user.profile?.school.includes(filters.school) : true) &&
            (filters.typeOfSchool ? user.profile?.typeOfSchool === filters.typeOfSchool : true)
        );
    });

    return (
        <div className="container">
            <h2>All Users</h2>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search by name, race, gender, school, etc."
                />
            </div>
            <div className="filters">
                <div className="form-group">
                    <select name="race" className="form-control" value={filters.race} onChange={handleFilterChange}>
                        <option value="">All Races</option>
                        <option value="Race1">Race1</option>
                        <option value="Race2">Race2</option>
                    </select>
                </div>
                <div className="form-group">
                    <select name="gender" className="form-control" value={filters.gender} onChange={handleFilterChange}>
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="school"
                        value={filters.school}
                        onChange={handleFilterChange}
                        placeholder="School"
                    />
                </div>
                <div className="form-group">
                    <select name="typeOfSchool" className="form-control" value={filters.typeOfSchool} onChange={handleFilterChange}>
                        <option value="">All Types</option>
                        <option value="College">College</option>
                        <option value="Trade School">Trade School</option>
                    </select>
                </div>
            </div>
            {filteredUsers.length === 0 ? (
                <p>No users found</p>
            ) : (
                <ul className="list-group">
                    {filteredUsers.map(user => (
                        <li key={user._id} className="user-card">
                            <img
                                src={user.profile?.profilePic || 'https://via.placeholder.com/100'}
                                alt="Profile"
                                className="avatar"
                            />
                            <div>
                                <h5>{user.profile?.name || 'No Name Provided'}</h5>
                                <p>Email: {user.email}</p>
                                <p>School: {user.profile?.school || 'No School Provided'}</p>
                                <p>Type of School: {user.profile?.typeOfSchool || 'No Type Provided'}</p>
                                <p>Amount Needed: {user.profile?.amountNeeded || 'No Amount Provided'}</p>
                                <p>Bio: {user.profile?.bio || 'No Bio Provided'}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Users;
