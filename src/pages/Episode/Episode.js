import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import { getEpisode, getUrl } from "../../api";

function makePromises(elements = []) {
  return elements.map((url) => getUrl(url));
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
  }

  componentDidMount() {
    // console.log(this.props);  Mirar en match.params que está lo que pedimos antes por url!
    const { match } = this.props;
    const { episodeId } = match.params;
    // console.log(episodeId);
    this.loadEpisode(episodeId);
  }

  async loadEpisode(episodeId) {
    try {
      const { data } = await getEpisode(episodeId);
      // console.log(data);

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
      // console.log(characters);
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
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-12">
              <h1>{episode.name}</h1>
            </div>
            {/* <div className="col col-12">
              <hr />
            </div> */}
            <div className="col col-12">
              <div className="Episode__meta">
                <p className="Episode__meta-item">{episode.air_date}</p>
                <p className="Episode__meta-item">|</p>
                <p className="Episode__meta-item">{episode.episode}</p>
              </div>
            </div>
          </section>
        )}
        <section className="row">
          <div className="col col-12">
            <hr />
          </div>
          {hasError && (
            <div className="col col-12">
              <p>Episode error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <p>Episode not loaded...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {/* {JSON.stringify(episode, null, 2)} */}

          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
              // species={character.species}
              status={character.status}
              origin={character.origin}
              // location={character.location}
            />
          ))}
        </section>
      </Layout>
    );
  }
}

export default Episode;
