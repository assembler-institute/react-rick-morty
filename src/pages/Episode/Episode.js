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
      const promises = data.characters.map((character) => axios.get(character));

      const charactersResponse = await Promise.all(promises);
      const characters = charactersResponse.map((character) => character.data);

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
              <h1>Episode loaded,...</h1>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <h1>Episode not loaded,...</h1>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>Episode Error,...</h1>
              <p>{errorMessage}</p>
            </div>
          )}

          <hr />
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
