import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import EpisodeTitle from "../../components/EpisodeTitle";

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

      const characters = charactersResponse.map((character) => character.data);

      this.setState({
        characters: characters,
        hasLoaded: true,
        episode: data,
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
              <h1>Loading episode...</h1>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>Something went wrong!</h1>
              <p>{errorMessage}</p>
            </div>
          )}
          {hasLoaded && !hasError && (
            <EpisodeTitle
              key={episode.id}
              id={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
            />
          )}
          <div className="col col-12">
            <h4>Characters</h4>
          </div>
          <div className="col col-12">
            <hr />
          </div>
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
