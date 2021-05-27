import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterLayout from "../../components/CharacterLayout";
import EpisodeCard from "../../components/EpisodeCard";

import { getCharacter, getUrl } from "../../api/api";

function makePromises(data) {
  return data.episode.map((episode) => getUrl(episode));
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
    const {
      match: {
        params: { characterId },
      },
    } = this.props;

    this.loadCharacter(characterId);
  }

  async loadCharacter(characterId) {
    try {
      const { data } = await getCharacter(characterId);
      // eslint-disable-next-line compat/compat
      const response = await Promise.all(makePromises(data));
      const episodes = response.map((element) => element.data);

      this.setState({
        character: data,
        episodes: episodes,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasLoaded: false,
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
          {!hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Loading episode...</h1>
            </div>
          )}
          {!hasLoaded && hasError && (
            <div className="col col-12">
              <h1>Error: {errorMessage}</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>

          {character && (
            <CharacterLayout
              name={character.name}
              image={character.image}
              species={character.species}
              status={character.status}
              origin={character.origin.name}
              location={character.location.name}
            />
          )}
          <div className="col col-12">
            <hr />
          </div>
          <div className="col col-12">
            <h4>Episodes</h4>
            <hr />
          </div>

          {episodes.map((episode) => (
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
