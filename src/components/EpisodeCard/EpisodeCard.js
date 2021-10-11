import React from "react";
import { Link } from "react-router-dom";

import "./EpisodeCard.scss";

import * as routes from "../../constants/routes";

function EpisodeCard({ episodeId, name, airDate, episode }) {
  return (
    <div className="col col-12 col-sm-6 col-xl-4 EpisodeCard">
      <Link to={`${routes.EPISODE}/${episodeId}`}>
        <h3 className="Episode__name h5">{name}</h3>
      </Link>
      <div className="Episode__meta">
        <p className="Episode__meta-item">{airDate}</p>
        <p className="Episode__meta-item">|</p>
        <p className="Episode__meta-item">{episode}</p>
      </div>
    </div>
  );
}

export default EpisodeCard;
