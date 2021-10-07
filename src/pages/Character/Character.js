import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { getCharacter, getDataList } from "../../api/api";
import SingleCharacter from "../../components/SingleCharacter";

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
  }

  async componentDidMount() {
    this.loadCharacter();
  }

  async loadCharacter() {
    const id = this.props.match.params.id;

    try {
      const character = await getCharacter(id);
      const episodes = await getDataList(character.episode);

      this.setState({
        character,
        episodes,
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
    const {character, episodes, hasLoaded, hasError, errorMessage} = this.state;

    return (
      <Layout>
        <section className="row">
            {hasError && (
              <div className="col col-12">
                <h1>Character could not be loaded...</h1>
                <p>{errorMessage}</p>
              </div>
            )}
            {!hasLoaded && (
              <div className="col col-12">
                <h1>Loading character...</h1>
              </div>
            )}
            {character && (
              <SingleCharacter
                key={character.id}
                image={character.image}
                name={character.name}
                species={character.species}
                status={character.status}
                origin={character.origin.name}
                location={character.location.name}
              />
            )}
            </section>
            <section className="row">
            <div className="col col-12">
              <hr />
            </div>
            <div className="col col-12">
              <h4>📺Episodes:</h4>
            </div>
            <div className="col col-12">
              <hr />
            </div>
              {episodes.length > 0 &&
              episodes.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  id={episode.id}
                  name={episode.name}
                  airDate={episode.air_date}
                  episodes={episode.episode}
                />
              ))}
            </section>

      </Layout>
    );
  }
}

export default Character;