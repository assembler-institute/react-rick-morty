import React from "react";

function LocationTitle({ id, name, type, dimension }) {
  return (
    <div className="d-flex flex-column justify-content-center ml-3 mb-4">
      <h3>{name}</h3>
      <div className="d-flex flex-row mt-4">
        <div className="mr-4">
          <h6>TYPE</h6>
          <p>{type}</p>
        </div>
        <div>
          <h6>DIMENSION</h6>
          <p>{dimension}</p>
        </div>
      </div>
    </div>
  );
}

export default LocationTitle;
