import React from "react";

import "./EachCharacterCard.scss";

function EachCharacterCard({ name, image, species, status, origin, location }) {
  return (
    <div className="row EachCharacterCard">
      <img className="EachCharacterCard__img col" src={image} alt="" />
      <div className="col">
        <h3 className="EachCharacterCard__name h4">{name}</h3>
        <hr />
        <div className="EachCharacterCard__meta mb-3">
          <div className="col">
            <p className="row font-weight-bold">CHARACTER</p>
            <div className="row">
              <p className="EachCharacterCard__meta-item">{species}</p>
              <p className="EachCharacterCard__meta-item">|</p>
              <p className="EachCharacterCard__meta-item">{status}</p>
            </div>
          </div>
        </div>
        <div className="EachCharacterCard__meta">
          <div className="col">
            <p className="row font-weight-bold">ORIGIN</p>
            <p className="EachCharacterCard__meta-item row"> {origin.name}</p>
          </div>
          <div className="col w-100">
            <p className="row font-weight-bold">LOCATION</p>
            <p className="EachCharacterCard__meta-item row">{location.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EachCharacterCard;
