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
    console.clear();
    const { match } = this.props;
    const { locationId } = match.params;
    console.log("Location id", locationId);
    console.log("Params", match.params);
    this.loadLocation(locationId);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  async loadLocation(locationId) {
    try {
      // Location data
      const { data } = await getLocation(locationId);
      console.log("Data, ", data);
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
          {/* {hasLoaded && (
            <div className="col col-12">
              <p>Location loaded</p>
            </div>
          )} */}
          {hasError && (
            <div className="col col-12">
              <p>Something went wrong</p>
              <p>{errorMessage}</p>
            </div>
          )}
          <hr />
          {hasLoaded && !hasError && (
            <div className="top-part mb-4 col col-12">
              <h1>{location.name}</h1>
            </div>
          )}
          <hr />
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
