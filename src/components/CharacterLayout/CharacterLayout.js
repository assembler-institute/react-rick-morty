import React from "react";

function CharacterLayout({ name, image, species, status, origin, location }) {
  return (
    <div className="col col-12 d-flex align-items-center">
      <img alt={name} src={image} />

      <div className="pl-5 flex-grow-1">
        <h3>{name}</h3>
        <hr />
        <h5>CHARACTER</h5>
        <p>
          {species} | {status}
        </p>

        <section className="d-flex">
          <div>
            <h6>ORIGIN</h6>
            <p>{origin}</p>
          </div>
          <div className="ml-4">
            <h6>LOCATION</h6>
            <p>{location}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CharacterLayout;
