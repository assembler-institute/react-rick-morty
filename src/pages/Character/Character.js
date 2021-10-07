import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { getCharacter, getDataList } from "../../api/api";

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
              <div className="col col-12">
          {
            hasLoaded && !hasError &&
            <div className="Episode__meta">
              <p className="Episode__meta-item font-weight-bold h3">{character.name}</p>
              <p className="Episode__meta-item h3">{character.image}</p>
              <p className="Episode__meta-item h3">{character.id}</p>
            </div>
          }
          </div>
            <div className="col col-12">
              <hr />
            </div>
            <div className="col col-12">
              <h2 className="h5">Episodes</h2>
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
        
        {!hasLoaded && (
          <section className="row">
            <div className="col col-12">
              <h1 className="h3">Loading data...</h1>
            </div>
          </section>
        )}
        {hasError && (
          <section className="row">
            <div className="col col-12">
              <h1>Something went wrong...</h1>
              <p>{errorMessage}</p>
            </div>
          </section>
        )}
      </Layout>
    );
  }
}

export default Character;