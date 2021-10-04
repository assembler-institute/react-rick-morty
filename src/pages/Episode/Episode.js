import React, { Component } from "react";

import { CharacterCard, Layout } from "components";

import episodesApi from "api/episodes";
import charactersApi from "api/characters";

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
      const episode = await episodesApi.getEpisode(episodeId);

      const characters = await charactersApi.getCharacters(episode);

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
