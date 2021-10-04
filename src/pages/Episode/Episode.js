import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import * as api from "../../constants/api";

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

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.loadCharacters(id);
  }

  async loadCharacters(id) {
    const response = await axios.get(`${api.EPISODE_URL}/${id}`);
    const episodeResponse = response.data;
    const characterUrls = response.data.characters;
    const requests = characterUrls.map((characterUrl) =>
      axios.get(characterUrl).catch((err) => null),
    );
    try {
      const characters = await axios.all(requests);
      this.setState({
        episode: episodeResponse,
        characters: characters,
        hasLoaded: true,
      });
    } catch (err) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: err.message,
      });
    }
    // console.log(this);
  }

  render() {
    // console.log(this.props);
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
              <h3>{episode.name}</h3>
              <h5>{episode.air_date}</h5>
              <h5>{episode.episode}</h5>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>{errorMessage}</h1>
            </div>
          )}
          <div className="col col-12">
            {characters.map((character) => (
              <CharacterCard
                key={character.data.id}
                id={character.data.id}
                name={character.data.name}
                image={character.data.image}
                species={character.data.species}
                status={character.data.status}
                origin={character.data.origin}
                location={character.data.location}
              />
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
