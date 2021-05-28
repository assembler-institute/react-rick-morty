import React, { Component } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import { getEpisode } from "../../api";

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

      const promises = data.characters.map((character) => {
        return axios.get(character);
      });

      const characterResponse = await Promise.all(promises);

      const characters = characterResponse.map((character) => character.data);

      this.setState({
        hasLoaded: true,
        episode: data,
        characters: characters,
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
          {hasLoaded && (
            <div className="col col-12">
              <p>Episode loaded</p>
            </div>
          )}

          {hasError && (
            <div className="col col-12">
              <p>Episode error</p>
              <p>{errorMessage}</p>
            </div>
          )}

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
