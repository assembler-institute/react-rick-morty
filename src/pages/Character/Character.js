import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

import { getCharacter, getUrl } from "../../api";

function makePromises(elements = []) {
  return elements.map((url) => getUrl(url));
}

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    // console.log(this.props);  Mirar en match.params que está lo que pedimos antes por url!
    const { match } = this.props;
    const { characterId } = match.params;
    // console.log(characterId);
    this.loadCharacter(characterId);
  }

  async loadCharacter(characterId) {
    try {
      const { data } = await getCharacter(characterId);
      // console.log({ data });

      // eslint-disable-next-line compat/compat
      const episodesResponse = await Promise.all(makePromises(data.episode));
      const episodes = episodesResponse.map((episode) => episode.data);
      // console.log({ episodes });
      this.setState({
        hasLoaded: true,
        character: data,
        episodes: episodes,
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
      episodes,
      character,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-4">
              <img src={character.image} alt="character" />
            </div>
            <div className="col col-8">
              <h1>{character.name}</h1>
              <div className="col col-12">
                <hr />
              </div>
              <h6>CHARACTER</h6>
              <span>{character.species}</span>
              <span> | </span>
              <span>{character.status}</span>
              <div className="row">
                <div className="col col-4">
                  <h6>ORIGIN</h6>
                  <p>{character.origin.name}</p>
                </div>
                <div className="col col-6">
                  <h6>LOCATION</h6>
                  <p>{character.location.name}</p>
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="row">
          <div className="col col-12">
            <hr />
          </div>
          <div className="col col-12">
            <h5>Episodes</h5>
          </div>
          <div className="col col-12">
            <hr />
          </div>
          {hasError && (
            <div className="col col-12">
              <p>Character error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <p>Character not loaded...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {/* {JSON.stringify(character, null, 2)} */}
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

export default Episode;
