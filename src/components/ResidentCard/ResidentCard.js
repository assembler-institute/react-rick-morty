import React from 'react';
import PropTypes from 'prop-types';

function ResidentCard({ id, image, name, species, status, origin, location }) {
  return (
    <div className="row">
      <img className="col col-6" src={image} alt={name} />
      <div className="col col-6 my-auto">
        <h3>{name}</h3>
        <hr />
        <h6 className="font-weight-bold">CHARACTER</h6>
        <p>{`${species} | ${status}`}</p>
        <div className="row">
          <div className="col col-12 col-sm-6">
            <h6 className="font-weight-bold">ORIGIN</h6>
            <p>{`${origin.name}`}</p>
          </div>
          <div className="col col-12 col-sm-6">
            <h6 className="font-weight-bold">LOCATION</h6>
            <p>{`${location.name}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ResidentCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  origin: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default ResidentCard;