import React, { Component } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard2";
import EpisodeCard from "../../components/EpisodeCard";

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // episode: null,
      character: [],
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    await this.loadCharacter();
  }

  async loadCharacter() {
    const { match } = this.props;
    const num = match.params.characterId;

    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/${num}`,
      );
      const arr = await axios.all(res.data.episode.map((e) => axios.get(e)));
      const arr2 = arr.map((e) => e.data);
      this.setState({
        character: res.data,
        episodes: arr2,
        hasLoaded: true,
      });
    } catch (e) {
      this.setState({
        hasError: true,
        errorMessage: "Error, page not loaded",
      });
    }
  }

  render() {
    const {
      character,
      episodes,
      hasError,
      errorMessage,
      hasLoaded,
    } = this.state;

    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-12">
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
                status={character.status}
                origin={character.origin}
                location={character.location.name}
                locationUrl={character.location.url}
              />
            </div>
            {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episodeId={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
            ))}
          </section>
        )}
        {hasError && (
          <div className="col col-12">
            <h1>{errorMessage}</h1>
          </div>
        )}
      </Layout>
    );
  }
}

export default Character;
