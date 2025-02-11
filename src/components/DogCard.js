import React from 'react';
//import '../styles/DogCard.css';

const DogCard = ({ dog, handleFavorite, isFavorite }) => {
  return (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} className="dog-image"/>
      <div className="dog-info">
        <h2>{dog.name}</h2>
        <p><strong>Breed:</strong> {dog.breed}</p>
        <p><strong>Age:</strong> {dog.age}</p>
        <p><strong>Zip Code:</strong> {dog.zip_code}</p>
        <button className={isFavorite ? "favorite-btn remove" : "favorite-btn"} onClick={() => handleFavorite(dog.id)}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default DogCard;
