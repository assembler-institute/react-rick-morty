import React, { Component } from "react";
import { getLocation, makePromises } from "../../api";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      characters: [],
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
    this.loadLocation(locationId);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  async loadLocation(locationId) {
    try {
      // Location data
      const { data } = await getLocation(locationId);
      // eslint-disable-next-line compat/compat
      const charactersOriginResponse = await Promise.all(
        makePromises(data.residents),
      );

      const charactersOrigin = charactersOriginResponse.map(
        (character) => character.data,
      );

      console.log(data, charactersOriginResponse);
      this.setState({
        hasLoaded: true,
        location: data,
        // characters: charactersOrigin,
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
      characters,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <section className="row" location={location}>
          {!hasLoaded && (
            <div className="col col-12">
              <p>Location not loaded</p>
            </div>
          )}
          {hasLoaded && (
            <div className="col col-12">
              <p>Location loaded</p>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Something went wrong</p>
              <p>{errorMessage}</p>
            </div>
          )}
          <hr />
          <div className="top-part col col-12">
            <h1>Location name</h1>
          </div>
          <hr />
          {characters.length > 0 &&
            characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
                status={character.status}
                origin={character.origin}
                location={character.location}
              />
            ))}
        </section>
      </Layout>
    );
  }
}

export default Location;
