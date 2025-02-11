import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favourites';
import Match from './pages/Match';
import Navbar from './components/NavBar';
import { UserProvider } from './context/UserContext';
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/match" element={<Match />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;