import React, { Component } from "react";

import Layout from "../../components/Layout";
import SingleCharacter from "../../components/SingleCharacter";
import EpisodeCard from "../../components/EpisodeCard";

import { getCharacter, getUrl } from "../../api";

function makePromises(urls = []) {
  return urls.map((url) => getUrl(url));
}

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
      const episodesResponse = await Promise.all(makePromises(data.episode));
      const episodes = episodesResponse.map((episode) => episode.data);
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
      character,
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {hasError && (
            <div className="col col-12">
              <h1>Character could not be loaded...</h1>
              <p>{errorMessage}</p>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <h1>Loading character...</h1>
            </div>
          )}
          {character && (
            <SingleCharacter
              key={character.id}
              image={character.image}
              name={character.name}
              species={character.species}
              status={character.status}
              origin={character.origin.name}
              location={character.location.name}
            />
          )}
        </section>
        <section className="row">
          <div className="col col-12">
            <hr />
          </div>
          <div className="col col-12">
            <h4>Episodes</h4>
          </div>
          <div className="col col-12">
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
