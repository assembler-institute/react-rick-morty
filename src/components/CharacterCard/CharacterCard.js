import React from "react";
import { Link } from "react-router-dom";

import "./CharacterCard.scss";

import * as routes from "../../constants/routes";

function CharacterCard({ infoCard, id, name, image, species, status, origin, location }) {
  if (infoCard) {
    return (

      <div className="row align-items-center">
        <div className="col">
          <img src={image} alt="character" />
        </div>
        <div className="col">
          <h2>{name}</h2>
          <hr />
          <h6><strong>CHARACTER</strong></h6>
          <p>{`${species} | ${status}`}</p>
          <div className="row justify-items-start">
            <div className="col w-100">
              <h6><strong>ORIGIN</strong></h6>
              <p>{origin}</p>
            </div>
            <div className="col">
              <h6><strong>LOCATION</strong></h6>
              <p>{location}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="col-12 col-sm-6 col-xl-3 CharacterCard">
      <img className="CharacterCard__img" src={image} alt="" />
      <Link to={`${routes.CHARACTER}/${id}`}>
        <h3 className="CharacterCard__name h4">{name}</h3>
      </Link>
      <div className="CharacterCard__meta">
        <Link
          className="CharacterCard__meta-item"
          to={`${routes.LOCATION}/${id}`}
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
