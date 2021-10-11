import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import "./CharacterCard.scss";

import * as routes from "constants/routes";

function CharacterCard({ id, name, image, species, status, origin, location }) {
  return (
    <div className="col col-12 col-sm-6 col-md-4 col-lg-3 CharacterCard">
      <img className="CharacterCard__img" src={image} alt={name} />
      <Link to={`${routes.CHARACTER}/${id}`}>
        <h3 className="CharacterCard__name h4">{name}</h3>
      </Link>
      <div className="CharacterCard__meta">
        <Link
          className="CharacterCard__meta-item"
          to={`${routes.LOCATION}/${id}`}
        >
          {origin.name}
        </Link>
        <p className="CharacterCard__meta-item">|</p>
        <p className="CharacterCard__meta-item">{status}</p>
      </div>
    </div>
  );
}

CharacterCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  origin: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default CharacterCard;
