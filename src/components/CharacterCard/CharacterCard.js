import React from "react";
import { Link } from "react-router-dom";

import "./CharacterCard.scss";

import * as routes from "../../constants/routes";

function CharacterCard({ id, name, image, species, status, origin, location, showMoreDetails = false }) {
  return (
    <div className="col col-12 CharacterCard">
      <img className="CharacterCard__img" src={image} alt="" />
      <Link to={`${routes.CHARACTER}/${id}`}>
        <h3 className="CharacterCard__name h4">{name}</h3>
      </Link>
      <div className="CharacterCard__meta">
        <p><strong>Origin: </strong>
        <Link
          className="CharacterCard__meta-item"
          to={`${routes.LOCATION}/${id}`}
        >
          {origin.name}
        </Link>
        </p>
        <p className="CharacterCard__meta-item">|</p>
        <p className="CharacterCard__meta-item"><strong>Status: </strong>{status}</p>
      </div>
      
      {showMoreDetails && (
          <div className="CharacterCard__meta">
            <p><strong>Location: </strong> 
            <Link
              className="CharacterCard__meta-item"
              to={`${routes.LOCATION}/${id}`}
            >
              {location.name}
            </Link>
            </p>
            <p className="CharacterCard__meta-item">|</p>
            <p className="CharacterCard__meta-item"><strong>Specie: </strong> {species}</p>
          </div>  
        )}
    </div>
  );
}

export default CharacterCard;
