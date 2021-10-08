import React from "react";
import { Link } from "react-router-dom";

import "./CharacterCard2.scss";

import * as routes from "../../constants/routes";

function CharacterCard({
  id,
  name,
  image,
  species,
  status,
  origin,
  location,
  locationUrl,
}) {
  const splitLocation = locationUrl.split("/");
  const num = splitLocation[splitLocation.length - 1];

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <Link
              className="CharacterCard__meta-item"
              to={`${routes.LOCATION}/${num}`}
            >
              Location - {location}
            </Link>
            <p className="card-text">Status - {status}</p>
            <p className="card-text">Origin - {origin.name}</p>
            <p className="card-text">
              <small className="text-muted">Specie - {species}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
