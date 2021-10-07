import React, { Component } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

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
    const { episodeId } = match.params;

    try {
      let data = await axios.get(
        `https://rickandmortyapi.com/api/episode/${episodeId}`,
      );
      const episode = data.data;

      data = data.data.characters;

      const promises = data.map((eachChar) => axios.get(eachChar));

      const res = await Promise.all(promises);
      const   characters = res.map((character) => character.data);

      this.setState({
        episode: episode,
        characters: characters,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        errorMessage: error,
      });
    }
  }

  render() {
    const {
      characters,
      hasError,
      hasLoaded,
      errorMessage,
      episode,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p>Episode Loading...</p>
            </div>
          )}

          {hasLoaded && (
            <div>
              <h5>{episode.name}</h5>
              <hr />
              <p>
                {episode.episode} | {episode.air_date}
              </p>
              <hr />
            </div>
          )}
          {hasLoaded && (
            <div className="row col-12">
              {characters.map((character) => (
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
          )}
        </section>
      </Layout>
    );
  }
}

export default Episode;
