import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import {getEpisode, getDataList} from "../../api/api";

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
    this.loadEpisode();
  }

  async loadEpisode() {
    const id = this.props.match.params.id;

    try {
      const episode = await getEpisode(id);
      const characters = await getDataList(episode.characters);

      this.setState({
        episode,
        characters,
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

    const {episode, characters, hasLoaded, hasError} = this.state;

    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
          {
            hasLoaded && !hasError &&
            <div className="Episode__meta">
              <p className="Episode__meta-item font-weight-bold h3">{episode.name}</p>
              <p className="Episode__meta-item h3">{episode.air_date}</p>
              <p className="Episode__meta-item h3">{episode.episode}</p>
            </div>
          }
          </div>
          <div className="col col-12 contents">
            {hasLoaded && !hasError && characters.map((character) => (
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
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
