import React, { Component } from "react";
import { getCharacter, makePromises } from "../../api";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import InfoCard from "../../components/InfoCard";

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
    console.clear();
    const { match } = this.props;
    const { characterId } = match.params;
    this.loadCharacter(characterId);
  }

  componentDidUpdate() {
    // eslint-disable-next-line no-console
    console.log(this.state);
  }

  async loadCharacter(characterId) {
    try {
      const { data } = await getCharacter(characterId);
      console.log(data);

      // eslint-disable-next-line compat/compat
      const characterEpisodesResponse = await Promise.all(
        makePromises(data.episode),
      );
      const characterEpisodes = characterEpisodesResponse.map(
        (episode) => episode.data,
      );

      this.setState({
        hasLoaded: true,
        character: data,
        episodes: characterEpisodes,
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
        <section className="row" character={character} episodes={episodes}>
          {!hasLoaded && (
            <div className="col col-12">
              <p>Character not loaded</p>
            </div>
          )}
          {/* {hasLoaded && (
            <div className="col col-12">
              <p>Location loaded</p>
            </div>
          )} */}
          {hasError && (
            <div className="col col-12">
              <p>Something went wrong</p>
              <p>{errorMessage}</p>
            </div>
          )}
          <hr />
          {hasLoaded && !hasError && (
            <div className="top-part row px-0 mb-4 col col-12 d-flex justify-content-between">
              <div className="right-part col col-5 p-0">
                <img src={character.image} alt={`${character.name} image`} />
              </div>

              <div className="left-part col col-6 px-0">
                <h1>{character.name}</h1>
                <div className="col col-12 mb-4 px-0">
                  <hr />
                </div>
                <div className="col col-12 mb-3 px-0 d-flex flex-wrap">
                  <InfoCard
                    title="CHARACTER"
                    subtitle={character.species}
                    subtitle2={character.status}
                  />
                  <InfoCard title="ORIGIN" subtitle={character.origin.name} />
                  <InfoCard
                    title="LOCATION"
                    subtitle={character.location.name}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="col col-12 my-0">
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
