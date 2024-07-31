import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Search from './components/Search';
import About from './components/About';
import Contact from './components/Contact';
import Users from './components/Users';
import Entry from './components/Entry/Entry';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
      <Router>
          <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" href="/">StudentClover</a>
                  <div className="collapse navbar-collapse">
                      <ul className="navbar-nav mr-auto">
                          <li className="nav-item">
                              <a className="nav-link" href="/search">Search</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="/about">About</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="/contact">Contact</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="/users">Users</a>
                          </li>
                      </ul>
                  </div>
              </nav>

              <Routes>
                  <Route path='/' element={<Entry />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/users" element={<Users />} />
              </Routes>
          </div>
      </Router>
  );
};

export default App;