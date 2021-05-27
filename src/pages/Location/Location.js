import React, { Component } from "react";

import { getLocation, getUrl } from "../../components/api";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

const makePromise = (urls = []) => {
  return urls.map((url) => getUrl(url));
};

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
      const residentsResponse = await Promise.all(makePromise(data.residents));
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
      residents,
      hasLoaded,
      hasError,
      location,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h2>
                Location:{" "}
                <span
                  style={{
                    color: "deepPink",
                    fontWeight: "600",
                    letterSpacing: "2px",
                    wordSpacing: "10px",
                    fontSize: "30px",
                    marginLeft: "5px",
                  }}
                >
                  {location.name}
                </span>
              </h2>
              <hr />
              <div className="text-success">
                <h5>Type: {location.type}</h5>
                <h5>Dimension: {location.dimension}</h5>
              </div>
              <hr />
            </div>
          )}
          {residents.length > 0 &&
            residents.map((resident) => (
              <CharacterCard
                className="row"
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

          {hasError && (
            <div className="col col-12">
              <p>{errorMessage}</p>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <h1>Loading episodes...</h1>
            </div>
          )}
        </section>
      </Layout>
    );
  }
}

export default Location;
