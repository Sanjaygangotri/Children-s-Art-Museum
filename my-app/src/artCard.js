import React from "react";
import "./MuseumGallery.css";

const ArtCard = ({ art }) => {
  return (
    <div className="art-card">
      <h3>{art.title}</h3>
      <div className="art-image">
        <img src={art.imageUrl} alt={art.title} />
      </div>
      <div className="art-info">
        <p><strong>Art by:</strong> {art.artBy}</p>
        <p><strong>Age:</strong> {art.age}</p>
        <p><strong>College:</strong> {art.school}</p>
        {art.description && <p><strong>Description:</strong> {art.description}</p>}
      </div>
    </div>
  );
};

export default ArtCard;
