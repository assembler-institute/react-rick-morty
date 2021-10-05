import React from "react";
import { Link } from "react-router-dom";

import "./CharacterCard.scss";

import * as routes from "../../constants/routes";

function CharacterCard({ id, name, image, species, status, origin, location }) {
  let locationID = location.slice(41)
  return (
    <div className="col col-12 col-sm-6 col-xl-4 CharacterCard">
      <Link to={`${routes.CHARACTER}/${id}`}>
        <img className="CharacterCard__img" src={image} alt={`${name} image`} />
      </Link>
      <Link to={`${routes.CHARACTER}/${id}`}>
        <h3 className="CharacterCard__name h4">{name}</h3>
      </Link>
      <div className="CharacterCard__meta">
        <Link
          className="CharacterCard__meta-item"
          to={`${routes.LOCATION}/${locationID}`}
        >
          {origin.name}
        </Link>
        <p className="CharacterCard__meta-item">|</p>
        <p className="CharacterCard__meta-item">{status}</p>
      </div>
    </div>
  );
}

export default CharacterCard;