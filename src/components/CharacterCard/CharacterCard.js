import React from "react";
import { Link } from "react-router-dom";

import "./CharacterCard.scss";

import * as routes from "../../constants/routes";

function CharacterCard({ id, name, image, species, status, origin, location }) {
  let locationId = location.url
    ? location.url.split("/")[location.url.split("/").length - 1]
    : null;
  console.log(locationId);

  let originId = origin.url
    ? origin.url.split("/")[origin.url.split("/").length - 1]
    : null;
  console.log(originId);

  return (
    <div className="col col-12 col-sm-6 col-xl-3 CharacterCard">
      <img className="CharacterCard__img" src={image} alt="" />
      <Link to={`${routes.CHARACTER}/${id}`}>
        <h3 className="CharacterCard__name h4">{name}</h3>
      </Link>
      <div className="CharacterCard__meta">
        {originId && (
          <Link
            className="CharacterCard__meta-item"
            to={`${routes.LOCATION}/${originId}`}
          >
            <strong>Origin: </strong>
            {origin.name}
          </Link>
        )}
        <p className="CharacterCard__meta-item">|</p>
        <p className="CharacterCard__meta-item">
          <strong>Status: </strong>
          {status}
        </p>
        <p className="CharacterCard__meta-item">
          <strong>Species: </strong>
          {species}
        </p>
        {locationId && (
          <Link
            className="CharacterCard__meta-item"
            to={`${routes.LOCATION}/${locationId}`}
          >
            <strong>Location: </strong>
            {location.name}
          </Link>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;
