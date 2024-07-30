import React from 'react';

const Contact = () => {
    return (
        <div className="container">
            <h2>Contact Us</h2>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name" />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="form-group">
                    <textarea className="form-control" placeholder="Message"></textarea>
                </div>
                <button className="btn btn-primary" type="submit">Send</button>
            </form>
        </div>
    );
};

export default Contact;
