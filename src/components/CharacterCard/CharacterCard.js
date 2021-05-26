import React, { Component } from "react";
import { Link } from "react-router-dom";

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

    const originArr = origin.url.split("/");
    const originId = originArr[originArr.length - 1];
    // console.log(originArr, originId);

    return (
      <div
        species={species}
        location={location}
        className="col col-12 col-sm-6 col-xl-3 CharacterCard"
      >
        <img className="CharacterCard__img" src={image} alt="" />
        <Link to={`${routes.CHARACTER}/${id}`}>
          <h3 className="CharacterCard__name h4">{name}</h3>
        </Link>
        <div className="CharacterCard__meta">
          <Link
            className="CharacterCard__meta-item"
            to={`${routes.LOCATION}/${originId}`}
          >
            {origin.name}
          </Link>
          <p className="CharacterCard__meta-item">|</p>
          <p className="CharacterCard__meta-item">{status}</p>
        </div>
      </div>
    );
  }
}

export default CharacterCard;
