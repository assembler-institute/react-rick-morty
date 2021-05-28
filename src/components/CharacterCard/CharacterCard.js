import React from "react";
import { Link } from "react-router-dom";

import "./CharacterCard.scss";

import * as routes from "../../constants/routes";

function CharacterCard({ id, name, image, species, status, origin, location }) {
  return (
    <div className="col col-12 col-sm-6 col-xl-3 CharacterCard">
      <img className="CharacterCard__img" src={image} alt="" />
      <Link to={`${routes.CHARACTER}/${id}`}>
        <h3 className="CharacterCard__name h4">{name}</h3>
      </Link>
      <div className="d-flex">
        <Link
          className="CharacterCard__meta-item"
          to={`${routes.LOCATION}/${id}`}
        >
          {origin.name}
        </Link>
        <p className="CharacterCard__meta-item text-info">{location.name}</p>
        <p className="CharacterCard__meta-item text-warning">{status}</p>
        <p className="CharacterCard__meta-item text-muted">{species}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
