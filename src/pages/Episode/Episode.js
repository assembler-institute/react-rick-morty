import React, { Component } from "react";
import { getEpisode, makePromises } from "../../api";
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

    this.loadEpisode = this.loadEpisode.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { episodeId } = match.params;
    this.loadEpisode(episodeId);
  }

  async loadEpisode(episodeId) {
    try {
      const { data } = await getEpisode(episodeId);
      // eslint-disable-next-line compat/compat
      const charactersResponse = await Promise.all(
        makePromises(data.characters),
      );
      const characters = charactersResponse.map((character) => character.data);

      this.setState({
        hasLoaded: true,
        episode: data,
        characters: characters,
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
              <p>Episode not loaded</p>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Something went wrong</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episode {episode.name}</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {/* CHARACTERS IN EPISODE */}
          {characters.length > 0 &&
            characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                status={character.status}
                origin={character.origin}
              />
            ))}
        </section>
      </Layout>
    );
  }
}

export default Episode;
