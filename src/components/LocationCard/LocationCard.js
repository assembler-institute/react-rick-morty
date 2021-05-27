import React from "react";

function LocationCard({ name, type, dimension }) {
  return (
    <div className="col col-12 ">
      <h1>{name}</h1>
      <hr />
      <section className="d-flex">
        <div>
          <h6>TYPE</h6>
          <p>{type}</p>
        </div>
        <div className="ml-4">
          <h6>DIMENSION</h6>
          <p>{dimension}</p>
        </div>
      </section>
    </div>
  );
}

export default LocationCard;
