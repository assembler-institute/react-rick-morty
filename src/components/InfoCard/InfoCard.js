import React from "react";

import "./InfoCard.scss";

function InfoCard({ title, subtitle, subtitle2 = null }) {
  return (
    <div className="col col-5 mr-3 px-0">
      <h5>{title}</h5>

      <div className="d-flex">
        <p className="mr-2">{subtitle}</p>
        {subtitle2 && (
          <>
            <p className="mr-2">|</p>
            <p className="mr-2">{subtitle2}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoCard;
