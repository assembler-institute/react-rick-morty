import React from "react";
import { Link } from "react-router-dom";
import { returnLocationId } from "../../api";
import * as routes from "../../constants/routes";

import "./InfoCard.scss";

function InfoCard({
  title,
  subtitle,
  subtitleId = null,
  subtitleURL = null,
  subtitle2 = null,
  subtitle2Id = null,
}) {
  let subtitleRoute = null;
  let subtitle2Route = null;

  // CHARACTER
  if (title === "CHARACTER") {
    const newId = subtitleId.toLowerCase();
    const new2Id = subtitle2Id.toLowerCase();
    subtitleRoute = `${routes.SPECIES}?species=${newId}`;
    if (subtitle2 !== null) {
      subtitle2Route = `${routes.STATUS}?status=${new2Id}`;
    }
    // ORIGIN
  } else if (title === "ORIGIN") {
    subtitleRoute = `${routes.LOCATION}/${returnLocationId(subtitleURL)}`;
    // LOCATION
  } else {
    subtitleRoute = `${routes.LOCATION}/${returnLocationId(subtitleURL)}`;
  }

  return (
    <div className="col col-5 mr-3 px-0">
      {/* TITLE */}
      <h5>{title}</h5>
      {/* SUBTITLES */}
      <div className="d-flex">
        <Link className="subtitle-link" to={subtitleRoute}>
          <p className="mr-2">{subtitle}</p>
        </Link>
        {subtitle2 && (
          <>
            <p className="mr-2">|</p>
            <Link className="subtitle2-link" to={subtitle2Route}>
              <p className="mr-2">{subtitle2}</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoCard;
