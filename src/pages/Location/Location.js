import React, { Component } from "react";

import { ResidentCard, Layout } from "components";

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
      const { data: location } = await locationsApi.getLocation(locationId);

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
                residents.map(({ data: resident }) => (
                  <ResidentCard
                    key={resident.id}
                    id={resident.id}
                    name={resident.name}
                    image={resident.image}
                    species={resident.species}
                    status={resident.status}
                    origin={resident.origin}
                    location={resident.location}
                  />
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