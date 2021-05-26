import React, { Component } from "react";

import Layout from "../../components/Layout";
import LocationCard from "../../components/LocationCard";
import CharacterCard from "../../components/CharacterCard";

import { getLocation, getUrl } from "../../api/api";

function makePromises(data) {
  return data.residents.map((resident) => getUrl(resident));
}

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

    this.loadLoaction = this.loadLoaction.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { locationId },
      },
    } = this.props;

    this.loadLoaction(locationId);
  }

  async loadLoaction(characterId) {
    try {
      const { data } = await getLocation(characterId);
      // eslint-disable-next-line compat/compat
      const response = await Promise.all(makePromises(data));
      const residents = response.map((element) => element.data);

      this.setState({
        location: data,
        residents: residents,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasLoaded: false,
        hasError: true,
        errorMessage: error.message,
        location: null,
        residents: [],
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
          {!hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Loading location...</h1>
            </div>
          )}
          {!hasLoaded && hasError && (
            <div className="col col-12">
              <h1>Error: {errorMessage}</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>

          {location && (
            <LocationCard
              name={location.name}
              type={location.type}
              dimension={location.dimension}
            />
          )}

          <div className="col col-12">
            <hr />
            <h4>Residents </h4>
            <hr />
          </div>

          {residents.map((resident) => (
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
