import React from "react";
import { Link } from "react-router-dom";

import "./CharacterCard.scss";

import * as routes from "../../constants/routes";

function CharacterCard({ id, name, image, species, status, origin, location }) {
  const originLink = (
    <Link
      className="CharacterCard__meta-item"
      to={() => {
        const splitted = origin.url.split("/");
        return `${routes.LOCATION}/${splitted[splitted.length - 1]}`;
      }}
    >
      {origin.name}
    </Link>
  );
  return (
    <div className="col col-12 col-sm-6 col-xl-3 CharacterCard">
      <img className="CharacterCard__img" src={image} alt="" />
      <Link to={`${routes.CHARACTER}/${id}`}>
        <h3 className="CharacterCard__name h4">{name}</h3>
      </Link>
      <div className="CharacterCard__meta">
        {origin.url ? (
          originLink
        ) : (
          <p className="CharacterCard__meta-item">{origin.name}</p>
        )}
      </div>
      <p className="CharacterCard__meta-line">Status: {status}</p>
      <div className="">
        {species && (
          <p className="CharacterCard__meta-line">Species: {species}</p>
        )}
        {/* {species && location && <p className="CharacterCard__meta-item">|</p>} */}
        {location && (
          <p className="CharacterCard__meta-line">
            Resident of {location.name}
          </p>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;
