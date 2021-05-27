import React, { Component } from "react";
import { getLocation, makePromises } from "../../api";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      residents: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
    this.loadLocation = this.loadLocation.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.clear();
    const { match } = this.props;
    const { locationId } = match.params;
    this.loadLocation(locationId);
  }

  async loadLocation(locationId) {
    try {
      const { data } = await getLocation(locationId);
      // eslint-disable-next-line compat/compat
      const charactersOriginResponse = await Promise.all(
        makePromises(data.residents),
      );
      const charactersOrigin = charactersOriginResponse.map(
        (character) => character.data,
      );

      this.setState({
        hasLoaded: true,
        location: data,
        residents: charactersOrigin,
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
    const {
      location,
      residents,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p>Location not loaded</p>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Something went wrong</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {hasLoaded && !hasError && (
            <div className="top-part mb-4 col col-12">
              <h1>{location.name}</h1>
              <div className="location-tags d-flex">
                <p className="badge badge-primary p-1 mr-1">{location.type}</p>
                <p className="badge badge-dark p-1">{location.dimension}</p>
              </div>
            </div>
          )}
          <div className="col col-12 my-0">
            <hr />
          </div>
          <div className="col col-12 mb-3">
            <h4>Residents</h4>
          </div>
          {residents.length > 0 &&
            residents.map((resident) => (
              <CharacterCard
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
        </section>
      </Layout>
    );
  }
}

export default Location;
