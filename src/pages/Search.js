import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import DogCard from '../components/DogCard';
import SearchFilters from '../components/SearchFilters';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';

const Search = () => {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [filters, setFilters] = useState({ breed: '', ageMin: '', ageMax: '', zipCodes: [] });
  const [sort, setSort] = useState('breed:asc');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { favorites, setFavorites } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBreeds();
    fetchDogs();
  }, [filters, sort, page]);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
      setBreeds(response.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const fetchDogs = async () => {
    try {
      const params = {
        breeds: filters.breed ? [filters.breed] : undefined,
        ageMin: filters.ageMin || undefined,
        ageMax: filters.ageMax || undefined,
        zipCodes: filters.zipCodes.length ? filters.zipCodes : undefined,
        size: 25,
        from: (page - 1) * 25,
        sort, 
      };

      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', { params, withCredentials: true });
      const dogDetails = await axios.post('https://frontend-take-home-service.fetch.com/dogs', response.data.resultIds, { withCredentials: true });

      setDogs(dogDetails.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Search Dogs</h1>
        <button className="favorites-btn" onClick={() => navigate('/favorites')}>
          View Favorites ({favorites.length})
        </button>
      </div>

      
      <div className="sort-container">
        <label>Sort By Breed:</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="breed:asc">Ascending</option>
          <option value="breed:desc">Descending</option>
        </select>
      </div>

      <SearchFilters breeds={breeds} filters={filters} setFilters={setFilters} />

      <div className="dog-list">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} handleFavorite={(id) => {
            setFavorites((prev) => prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]);
          }} isFavorite={favorites.includes(dog.id)} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} total={total} />
    </div>
  );
};

export default Search;
