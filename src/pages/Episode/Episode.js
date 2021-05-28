import React, { Component } from "react";

import { getEpisode, getUrl } from "../../components/api";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

const makePromise = (urls = []) => {
  return urls.map((url) => getUrl(url));
};
class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      episode: null,
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
      const characterResponse = await Promise.all(makePromise(data.characters));
      const characters = characterResponse.map((character) => character.data);
      this.setState({
        episode: data,
        characters: characters,
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
      errorMessage,
      characters,
      episode,
    } = this.state;
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
              <h1>{episode.name}</h1>
              <hr />
              <div className="d-flex align-middle">
                <h6 className="p-1 m-0">{episode.episode}</h6>
                <h6 className="p-1 m-0">|</h6>
                <h6 className="p-1 m-0">{episode.air_date}</h6>
              </div>
              <hr />
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Episode Error</p>
              <p>{errorMessage}</p>
            </div>
          )}
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
        </section>
      </Layout>
    );
  }
}

export default Episode;
