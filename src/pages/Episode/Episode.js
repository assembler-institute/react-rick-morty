import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import { getEpisode, getUrl } from "../../api";

function makePromises(urls = []) {
  return urls.map((url) => getUrl(url));
}

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
      const charactersResponse = await Promise.all(
        makePromises(data.characters),
      );
      const characters = charactersResponse.map((character) => {
        return character.data;
      });
      this.setState({
        characters: characters,
        episode: data,
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
      episode,
      characters,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>{episode && episode.name}</h1>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>Something went wrong...</h1>
              <p>{errorMessage}</p>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <h1>Loading episode...</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          <div className="col col-12">
            <div className="d-flex">
              <p className="mb-0 mr-2">{episode && episode.episode}</p>
              <p className="mb-0 mr-2">|</p>
              <p className="mb-0">{episode && episode.air_date}</p>
            </div>
          </div>
          <div className="col col-12">
            <hr />
          </div>
        </section>
        <section className="row">
          {characters.length > 0 &&
            characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
                origin={character.origin}
              />
            ))}
        </section>
      </Layout>
    );
  }
}

export default Episode;
