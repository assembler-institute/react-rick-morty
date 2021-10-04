import React, { Component } from "react";

import { Layout } from "components";

import locationsApi from "api/locations";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { locationId } = match.params;

    this.loadLocation(locationId);
  }

  loadLocation = async (locationId) => {
    try {
      const location = await locationsApi.getLocation(locationId);

      const residents = await locationsApi.getResidents(location);

      this.setState({
        hasLoaded: true,
        location: location,
        residents: residents,
      });
    } catch (error) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.message,
      });
    }
  }

  render() {
    const { location, hasLoaded, hasError, errorMessage, residents } = this.state;
    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p>Location not loaded...</p>
            </div>
          )}
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h5>
                Location:
                <span className="text-danger">{` ${location.name}`}</span>
              </h5>
              <h5>
                Type:
                <span className="text-danger">{` ${location.type}`}</span>
              </h5>
              <h5>
                Dimension:
                <span className="text-danger">{` ${location.dimension}`}</span>
              </h5>
              <hr />
              {residents.length > 0 &&
                residents.map((resident) => (
                  <div className="row" key={resident.id}>
                    <img className="col col-6" src={resident.image} alt="" />
                    <div className="col col-6 my-auto">
                      <h3>{resident.name}</h3>
                      <hr />
                      <h6 className="font-weight-bold">CHARACTER</h6>
                      <p>{`${resident.species} | ${resident.status}`}</p>
                      <div className="row">
                        <div className="col col-6">
                          <h6 className="font-weight-bold">ORIGIN</h6>
                          <p>{`${resident.origin.name}`}</p>
                        </div>
                        <div className="col col-6">
                          <h6 className="font-weight-bold">LOCATION</h6>
                          <p>{`${resident.location.name}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {hasError && (
            <div className="col col-12">
              <p>Location error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
        </section>
      </Layout>
    );
  }
}

export default Location;