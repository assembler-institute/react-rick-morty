import React, { Component } from "react";
import axios from "axios";

import Layout from "../../components/Layout";

import { getCharacter } from "../../Api";
import EpisodeCard from "../../components/EpisodeCard";

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

      const promises = data.episode.map((eachEpisode) =>
        axios.get(eachEpisode),
      );

      const episodesResponse = await Promise.all(promises);

      const episodes = episodesResponse.map((episode) => episode.data);

      this.setState({
        hasLoaded: true,
        character: data,
        episodes: episodes,
      });
    } catch (e) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: e.message,
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
          {!hasLoaded && (
            <div className="col col-12">
              <p>Character not loaded...</p>
            </div>
          )}
          {hasLoaded && (
            <div className="container">
              <div className="row">
                <img className="col col-3" src={character.image} alt="" />
                <div className="col col-6 my-auto">
                  <h3>{character.name}</h3>
                  <hr />
                  <h6 className="font-weight-bold">CHARACTER</h6>
                  <p>{`${character.species} | ${character.status}`}</p>
                  <div className="row">
                    <div className="col col-3">
                      <h6 className="font-weight-bold">ORIGIN</h6>
                      <p>{`${character.origin.name}`}</p>
                    </div>
                    <div className="col col-6">
                      <h6 className="font-weight-bold">LOCATION</h6>
                      <p>{`${character.location.name}`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <h4>Episodes</h4>
              <hr />
            </div>
          )}

          {hasError && (
            <div className="col col-12">
              <p>Character error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
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
