import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import { getLocation, getUrl } from "../../api";

function makePromises(urls = []) {
  return urls.map((url) => getUrl(url));
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

    this.loadLocation = this.loadLocation.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { locationId } = match.params;
    this.loadLocation(locationId);
  }

  async loadLocation(locationId) {
    try {
      const { data } = await getLocation(locationId);
      const residentsResponse = await Promise.all(makePromises(data.residents));
      const residents = residentsResponse.map((resident) => resident.data);
      this.setState({
        location: data,
        residents: residents,
        hasLoaded: true,
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
      extraInfo = true,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {hasError && (
            <div className="col col-12">
              <h1>Character could not be loaded...</h1>
              <p>{errorMessage}</p>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <h1>Loading character...</h1>
            </div>
          )}
          {location && (
            <>
              <div className="col col-12">
                <h1>{location.name}</h1>
                <div className="d-flex">
                  <div className="me-2">
                    <h4 className="CharacterCard__name h6 mb-0">TYPE</h4>
                    <p>{location.type}</p>
                  </div>
                  <div>
                    <h4 className="CharacterCard__name h6 mb-0">DIMENSION</h4>
                    <p>{location.dimension}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        <section className="row">
          <div className="col col-12">
            <hr />
          </div>
          <div className="col col-12">
            <h4>Residents</h4>
          </div>
          <div className="col col-12">
            <hr />
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
                extraInfo={extraInfo}
                location={resident.location}
              />
            ))}
        </section>
      </Layout>
    );
  }
}

export default Location;
