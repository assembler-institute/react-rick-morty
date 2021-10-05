import React, { Component } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // episode: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
      episodeName: "",
    };
    this.loadCharacters = this.loadCharacters.bind(this);
  }

  async componentDidMount() {
    await this.loadCharacters();
  }

  async loadCharacters() {
    const { match } = this.props;
    const num = match.params.episodeId;
    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/episode/${num}`,
      );
      const arr = await axios.all(res.data.characters.map((e) => axios.get(e)));
      const arr2 = arr.map((e) => e.data);
      this.setState({
        characters: arr2,
        hasLoaded: true,
        episodeName: res.data.name,
      });
    } catch (e) {
      this.setState({
        hasError: true,
        errorMessage: "Error, page not loaded",
      });
    }
  }

  render() {
    const {
      characters,
      hasLoaded,
      hasError,
      errorMessage,
      episodeName,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div>
              <p className="h1 block text-center mb-4">{episodeName}</p>
              <div className="row">
                {characters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    image={character.image}
                    species={character.species}
                    status={character.status}
                    origin={character.origin}
                    location={character.location.name}
                  />
                ))}
              </div>
            </div>
          )}
          {hasError && (
            <div className="row">
              <h1>{errorMessage}</h1>
            </div>
          )}
        </section>
      </Layout>
    );
  }
}

export default Episode;
