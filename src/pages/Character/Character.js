import React, { Component } from "react";
import EpisodeCard from "../../components/EpisodeCard";
import EachCharacterCard from "../../components/EachCharacterCard";

import { getCharacter, getUrl } from "../../components/api";

import Layout from "../../components/Layout";
// import CharacterCard from "../../components/CharacterCard";
const makePromise = (urls = []) => {
  return urls.map((url) => getUrl(url));
};

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadCharacter = this.loadCharacter.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { characterId } = match.params;
    this.loadCharacter(characterId);
  }

  async loadCharacter(characterId) {
    try {
      const { data } = await getCharacter(characterId);
      const episodeResponse = await Promise.all(makePromise(data.episode));
      const episodes = episodeResponse.map((episode) => episode.data);
      this.setState({
        character: data,
        episodes: episodes,
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
      hasLoaded,
      hasError,
      episodes,
      character,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <EachCharacterCard
              name={character.name}
              species={character.species}
              status={character.status}
              image={character.image}
              origin={character.origin}
              location={character.location}
            />
          )}
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
          <div className="col col-12">
            <h3>Episodes</h3>
            <hr />
          </div>

          {episodes.length > 0 &&
            episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
            ))}
        </section>
      </Layout>
    );
  }
}

export default Character;
