import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  render() {
    const {
      episode,
      characters,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <h1>Episode not loaded</h1>
            </div>
          )}
          {hasLoaded && (
            <div className="col col-12">
              <h1>Episode loaded</h1>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>Something went wrong</h1>
              <p>{errorMessage}</p>
            </div>
          )}
        </section>
        <hr />
        {JSON.stringify(episode, null, 2)}
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
      </Layout>
    );
  }
}

export default Episode;
