import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import '../styles/SearchFilters.css';

const SearchFilters = ({ breeds, filters, setFilters }) => {
  const [locations, setLocations] = useState([]);
  const [city, setCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Fetch locations when city or state is entered
  useEffect(() => {
    if (city || selectedState) {
      fetchLocations();
    }
  }, [city, selectedState]);

  const fetchLocations = async () => {
    setLoadingLocations(true);
    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/locations/search',
        {
          city: city || undefined,
          states: selectedState ? [selectedState] : undefined,
        },
        { withCredentials: true }
      );
      setLocations(response.data.results.map(loc => loc.zip_code)); 
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
    setLoadingLocations(false);
  };

  return (
    <div className="search-filters">
     
      <select value={filters.breed} onChange={(e) => setFilters({ ...filters, breed: e.target.value })}>
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>

    
      <input
        type="number"
        placeholder="Min Age"
        value={filters.ageMin}
        onChange={(e) => setFilters({ ...filters, ageMin: e.target.value })}
      />
      <input
        type="number"
        placeholder="Max Age"
        value={filters.ageMax}
        onChange={(e) => setFilters({ ...filters, ageMax: e.target.value })}
      />

      
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
        <option value="">Select State</option>
        {['CA', 'NY', 'TX', 'FL', 'IL'].map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

     
      {loadingLocations ? <p>Loading locations...</p> : (
        <select
          multiple
          value={filters.zipCodes}
          onChange={(e) =>
            setFilters({ ...filters, zipCodes: Array.from(e.target.selectedOptions, (option) => option.value) })
          }
        >
          {locations.map((zip) => (
            <option key={zip} value={zip}>{zip}</option>
          ))}
        </select>
      )}

    </div>
  );
};

export default SearchFilters;
