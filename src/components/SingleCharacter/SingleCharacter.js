import React from "react";

import "./SingleCharacter.scss";

function SingleCharacter({ image, name, species, status, origin, location }) {
  return (
    <>
      <div className="col col-12 col-sm-6 col-xl-3">
        <img className="CharacterCard__img" src={image} alt="" />
      </div>
      <div className="col">
        <h3 className="CharacterCard__name h4">{name}</h3>
        <hr />
        <div>
          <h4 className="CharacterCard__name h6 mb-0 bold">CHARACTER</h4>
          <p>
            {species} | {status}
          </p>
        </div>
        <div className="d-flex">
          <div className="me-2">
            <h4 className="CharacterCard__name h6 mb-0">ORIGIN</h4>
            <p>{origin}</p>
          </div>
          <div>
            <h4 className="CharacterCard__name h6 mb-0">LOCATION</h4>
            <p>{location}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleCharacter;
