import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import { getLocation, getUrl } from "../../api";

function makePromises(elements = []) {
  return elements.map((url) => getUrl(url));
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
  }

  componentDidMount() {
    // console.log(this.props);  Mirar en match.params que está lo que pedimos antes por url!
    const { match } = this.props;
    const { locationId } = match.params;
    // console.log(characterId);
    this.loadLocation(locationId);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { match: prevMatch } = prevProps;
    if (match !== prevMatch) {
      this.loadLocation(match.locationId);
    }
  }

  async loadLocation(locationId) {
    try {
      const { data } = await getLocation(locationId);
      // console.log({ data });

      // eslint-disable-next-line compat/compat
      const residentsResponse = await Promise.all(makePromises(data.residents));
      const residents = residentsResponse.map((resident) => resident.data);
      // console.log({ episodes });
      this.setState({
        hasLoaded: true,
        location: data,
        residents: residents,
      });
      // console.log(residents);
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
      location,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    const residentsMap = residents.map((character) => (
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
    ));
    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-12">
              <h1>{location.name}</h1>
              <div className="col col-12">
                <hr />
              </div>
              <div className="row">
                <div className="col col-4">
                  <h6>TYPE</h6>
                  <p>{location.type}</p>
                </div>
                <div className="col col-6">
                  <h6>DIMENSION</h6>
                  <p>{location.dimension}</p>
                </div>
                <div className="col col-12">
                  <hr />
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="row">
          <div className="col col-12">
            <h3>Residents:</h3>
          </div>
          <div className="col col-12">
            <hr />
          </div>
          {hasError && (
            <div className="col col-12">
              <p>Location error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <p>Location not loaded...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {/* {JSON.stringify(character, null, 2)} */}
          {residents.length > 0 ? residentsMap : <p>No residents</p>}
        </section>
      </Layout>
    );
  }
}

export default Location;
