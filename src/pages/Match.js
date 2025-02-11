import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../App.css';

const Match = () => {
  const [matchedDog, setMatchedDog] = useState(null);
  const location = useLocation();
  const matchId = location.state?.matchId;

  useEffect(() => {
    if (matchId) {
      fetchMatchedDog();
    }
  }, [matchId]);

  const fetchMatchedDog = async () => {
    const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', [matchId], {
      withCredentials: true,
    });
    setMatchedDog(response.data[0]);
  };

  return (
    <div className="match-container">
      <h1>Your Match</h1>
      {matchedDog ? (
        <div className="match-details">
          <img src={matchedDog.img} alt={matchedDog.name} />
          <h2>{matchedDog.name}</h2>
          <p>Breed: {matchedDog.breed}</p>
          <p>Age: {matchedDog.age}</p>
          <p>Zip Code: {matchedDog.zip_code}</p>
        </div>
      ) : (
        <p>Finding your perfect match...</p>
      )}
    </div>
  );
};

export default Match;
