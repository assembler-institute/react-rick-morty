import React, { Component } from "react";
import { getLocation } from "../../api";
import Layout from "../../components/Layout";
// import CharacterCard from "../../components/CharacterCard";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
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

  async loadLocation(locationId) {
    try {
      const { data } = await getLocation(locationId);
      // const { location } = data.location;
      console.log(data.id);
    } catch (error) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.message,
      });
    }
  }

  render() {
    const { location, hasLoaded, hasError, errorMessage } = this.state;
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
          {/* {characters.length > 0 &&
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
            ))} */}
        </section>
      </Layout>
    );
  }
}

export default Location;
