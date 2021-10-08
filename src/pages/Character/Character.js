/* eslint-disable no-console */

import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
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
  }

  async componentDidMount() {
    this.loadCharacter();
  }

  async loadCharacter() {
    console.log(this);
    // eslint-disable-next-line react/destructuring-assignment
    const id = this.props.match.params.id;
    const baseURL = `https://rickandmortyapi.com/api/character/ ${id}`;
    try {
      const APIcall = await axios.get(baseURL);

      const episodeArray = APIcall.data.episode;
      const episodes = await axios.all(
        episodeArray.map((episodeURL) => axios.get(episodeURL)),
      );

      this.setState({
        character: APIcall.data,
        episodes: episodes,
        hasLoaded: true,
      });
    } catch (err) {
      this.setState({
        hasError: false,
        errorMessage: "Character not found!!",
      });
    }
  }

  render() {
    const {
      hasLoaded,
      hasError,
      errorMessage,
      character,
      episodes,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            {hasLoaded && !hasError ? (
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
            ) : (
              <h1>{errorMessage}</h1>
            )}
          </div>
          <div className="col col-12">
            <hr />
          </div>
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.data.id}
              id={episode.data.id}
              name={episode.data.name}
              airDate={episode.data.air_date}
              episode={episode.data.episode}
            />
          ))}
          <div className="col col-12">
            <hr />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Character;
