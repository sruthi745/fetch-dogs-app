import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import DogCard from '../components/DogCard';
import '../App.css';

const Favorites = () => {
  const { favorites, setFavorites } = useContext(UserContext);
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (favorites.length > 0) {
      fetchFavoriteDogs();
    } else {
      setFavoriteDogs([]);
    }
  }, [favorites]);

  const fetchFavoriteDogs = async () => {
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', favorites, {
        withCredentials: true,
      });
      setFavoriteDogs(response.data);
    } catch (error) {
      console.error('Error fetching favorite dogs:', error);
    }
  };

  const handleFavorite = (id) => {
    if (favorites.includes(id)) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav !== id);
      setFavorites(updatedFavorites);
      
      // Remove from UI immediately
      setFavoriteDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
    } else {
      // Add back to favorites
      setFavorites([...favorites, id]);
    }
  };

  const generateMatch = async () => {
    if (favorites.length === 0) return;

    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match', favorites, {
        withCredentials: true,
      });
      navigate('/match', { state: { matchId: response.data.match } });
    } catch (error) {
      console.error('Error generating match:', error);
    }
  };

  return (
    <div className="favorites-container">
      <h1>My Favorite Dogs</h1>

      {favoriteDogs.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="dog-list">
          {favoriteDogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} handleFavorite={handleFavorite} isFavorite={favorites.includes(dog.id)} />
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <button className="match-btn" onClick={generateMatch}>
          Find My Match
        </button>
      )}
    </div>
  );
};

export default Favorites;
