import React from "react";

export default function LocationCard({ name, type, dimension }) {
  return (
    <React.Fragment>
      <div className="col col-12 col-sm-6 col-xl-4 LocationCard">
        <p>
          <strong>Planet name: </strong> {name}
        </p>
        <p>
          <strong>Planet type: </strong> {type}
        </p>
        <p>
          <strong>Dimension: </strong> {dimension}
        </p>
      </div>
    </React.Fragment>
  );
}
