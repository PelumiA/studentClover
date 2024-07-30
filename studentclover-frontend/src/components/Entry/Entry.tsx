import React from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

const Entry: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateProfileClick = () => {
        // Navigate to the profile creation page
        navigate('/create-profile');
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Welcome to Student Clover</h1>
            <div className="text-center mt-4">
                <button 
                    className="btn btn-primary btn-lg" 
                    onClick={handleCreateProfileClick}
                >
                    Create Profile
                </button>
            </div>
        </div>
    );
};

export default Entry;