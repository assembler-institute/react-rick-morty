import React from "react";
import { Link } from "react-router-dom";

import * as routes from "../../constants/routes";

function CharacterTitle({
  id,
  name,
  image,
  species,
  status,
  origin,
  location,
}) {
  const originId = origin.url.substr(41);
  const locationId = location.url.substr(41);
  return (
    <div className="d-flex flex-row mb-4">
      <img src={image} alt="" />
      <div className="d-flex flex-column justify-content-center pl-5 w-auto">
        <h3>{name}</h3>
        <div className="mt-3">
          <h6>CHARACTER</h6>
          <p>
            {species} | {status}
          </p>
        </div>
        <div className="d-flex flex-row mt-4">
          <div className="mr-4">
            <h6>ORIGIN</h6>
            <Link to={`${routes.LOCATION}/${originId}`}>
              <p>{origin.name}</p>
            </Link>
          </div>
          <div>
            <h6>LOCATION</h6>
            <Link to={`${routes.LOCATION}/${locationId}`}>
              <p>{location.name}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterTitle;
