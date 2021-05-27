import React, { Component } from "react";

import Layout from "../../components/Layout";
import LocationTitle from "../../components/LocationTitle";
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

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps;
    const { locationId: prevLocationId } = prevMatch.params;

    const { match } = this.props;
    const { locationId } = match.params;

    if (prevLocationId !== locationId) {
      this.loadLocation(locationId);
    }
  }

  async loadLocation(locationId) {
    try {
      const { data } = await getLocation(locationId);
      const residentsReponse = await Promise.all(makePromises(data.residents));
      const residents = residentsReponse.map((resident) => resident.data);
      this.setState({
        residents: residents,
        hasLoaded: true,
        location: data,
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
              <h1>Loading location...</h1>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>Something went wrong!</h1>
              <p>{errorMessage}</p>
            </div>
          )}
          {hasLoaded && !hasError && location && (
            <LocationTitle
              key={location.id}
              id={location.id}
              name={location.name}
              type={location.type}
              dimension={location.dimension}
            />
          )}
          <div className="col col-12">
            <h4>Residents</h4>
          </div>
          <div className="col col-12">
            <hr />
          </div>
          {residents.length === 0 && (
            <div className="col col-12">
              <h6>There are not residents here</h6>
            </div>
          )}
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
