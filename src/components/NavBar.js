import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, setUser, favorites,setFavorites } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://frontend-take-home-service.fetch.com/auth/logout',
        {}, 
        { withCredentials: true } 
      );

      
      setUser(null);
      setFavorites([]);
     
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <h1 className="brand-name">🐶 Fetch Dogs</h1>
      </div>
      
      <div className="nav-right">
        <ul className="nav-links">
          {user ? (
            <>
              <li><Link to="/search">Search Dogs</Link></li>
              <li><Link to="/favorites">Favorites ({favorites.length})</Link></li>
            </>
          ) : (
            <li><Link to="/">Login</Link></li>
          )}
        </ul>
        {user && (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
