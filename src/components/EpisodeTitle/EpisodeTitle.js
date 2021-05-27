import React from "react";

function EpisodeTitle({ id, name, airDate, episode }) {
  return (
    <div className="d-flex flex-column justify-content-center ml-3 mb-4">
      <h3>{name}</h3>
      <div className="d-flex flex-row mt-4">
        <div className="mr-4">
          <h6>AIR DATE</h6>
          <p>{airDate}</p>
        </div>
        <div>
          <h6>EPISODE</h6>
          <p>{episode}</p>
        </div>
      </div>
    </div>
  );
}

export default EpisodeTitle;
