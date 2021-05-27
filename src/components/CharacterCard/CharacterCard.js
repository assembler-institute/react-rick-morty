import React from "react";
import { Link } from "react-router-dom";

import "./CharacterCard.scss";

import * as routes from "../../constants/routes";

function CharacterCard({
  id,
  name,
  image,
  species,
  status,
  origin,
  location,
  extraInfo,
}) {
  function locationEndPoint(data) {
    const endPoint = data.split("/");
    return endPoint[endPoint.length - 1];
  }

  return (
    <div className="col col-12 col-sm-6 col-xl-3 CharacterCard">
      <img className="CharacterCard__img" src={image} alt="" />
      <Link to={`${routes.CHARACTER}/${id}`}>
        <h3 className="CharacterCard__name h4">{name}</h3>
      </Link>
      <div className="CharacterCard__meta">
        <Link
          className="CharacterCard__meta-item"
          to={`${routes.LOCATION}/${locationEndPoint(origin.url)}`}
        >
          {origin.name}
        </Link>
        <p className="CharacterCard__meta-item">|</p>
        <p className="CharacterCard__meta-item">{species}</p>
      </div>
      {extraInfo && (
        <div className="CharacterCard__meta">
          <p className="CharacterCard__meta-item">{status}</p>
          <p className="CharacterCard__meta-item">|</p>
          <p className="CharacterCard__meta-item">{location.name}</p>
        </div>
      )}
    </div>
  );
}

export default CharacterCard;
