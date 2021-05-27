import React, { Component } from "react";
import { Link } from "react-router-dom";
import { returnLocationId } from "../../api";

import "./CharacterCard.scss";

import * as routes from "../../constants/routes";

// eslint-disable-next-line react/prefer-stateless-function
class CharacterCard extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, image, species, status, origin, location } = this.props;

    return (
      <div className="col col-12 col-sm-6 col-xl-3 CharacterCard">
        <img className="CharacterCard__img" src={image} alt="" />
        <Link to={`${routes.CHARACTER}/${id}`}>
          <h3 className="CharacterCard__name h4 mb-2">{name}</h3>
        </Link>
        <div className="CharacterCard__meta d-flex flex-column">
          {species && (
            <div className="d-flex justify-content-between">
              <p className="CharacterCard__meta-item CharacterCard__meta-title">
                Species
              </p>
              <Link
                className="CharacterCard__meta-item"
                to={`${routes.SPECIES}?species=${species.toLowerCase()}`}
              >
                {species}
              </Link>
            </div>
          )}
          <div className="d-flex justify-content-between">
            <p className="CharacterCard__meta-item CharacterCard__meta-title">
              Status
            </p>
            <Link
              className="CharacterCard__meta-item"
              to={`${routes.STATUS}?status=${status.toLowerCase()}`}
            >
              {status}
            </Link>
          </div>
          <div className="d-flex justify-content-between">
            <p className="CharacterCard__meta-item CharacterCard__meta-title">
              Origin
            </p>
            <br />
            <Link
              className="CharacterCard__meta-item"
              to={`${routes.LOCATION}/${returnLocationId(origin.url)}`}
            >
              {origin.name}
            </Link>
          </div>
          {location && (
            <div className="d-flex justify-content-between">
              <p className="CharacterCard__meta-item CharacterCard__meta-title">
                Location
              </p>
              <br />
              <Link
                className="CharacterCard__meta-item"
                to={`${routes.LOCATION}/${returnLocationId(location.url)}`}
              >
                {location.name}
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CharacterCard;
