import React from "react";

function LocationCard({ name, type, dimension }) {
  return (
    <div className="col col-12 col-sm-6 col-xl-3">
      <h3>{name}</h3>
      <span>
        {type} | {dimension}
      </span>
    </div>
  );
}

export default LocationCard;
