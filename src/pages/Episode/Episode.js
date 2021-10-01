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

  componentDidMount() {
    const { match } = this.props;
    const { episodeId } = match.params;

    this.loadEpisode(episodeId);
  }

  loadEpisode = async (episodeId) => {
    try {
      const url = `https://rickandmortyapi.com/api/episode/${episodeId}`;
      const data = await fetch(url)
      const episode = await data.json();

      const characters = await Promise.all(
        episode.characters.map(async (character) => {
          const response = await fetch(character);
          return response.json()
        })
      );

      this.setState(() => ({
        episode: episode,
        hasLoaded: true,
        characters: characters
      }))

    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error.message
      }))
    }
  }

  render() {
    const { characters, episode, hasLoaded, hasError, errorMessage } = this.state

    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p>Episode not loaded...</p>
            </div>
          )}
          {hasLoaded && (
            <div className="col col-12">
              <h5>{episode.name}</h5>
              <hr />
              <p>{`${episode.episode} | ${episode.air_date}`}</p>
              <hr />
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Episode error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {characters.map((character) => (
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

export default Episode;
