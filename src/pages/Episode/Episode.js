import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import { getEpisode, getCharacter } from "../../api/api";

function makePromises(data) {
  return data.characters.map((character) => getCharacter(character));
}
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

    this.loadCharacters = this.loadCharacters.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { episodId },
      },
    } = this.props;
    this.loadCharacters(episodId);
  }

  async loadCharacters(episodId) {
    try {
      const { data } = await getEpisode(episodId);
      // eslint-disable-next-line compat/compat
      const response = await Promise.all(makePromises(data));
      const characters = response.map((element) => element.data);

      this.setState({
        episode: data,
        characters: characters,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasLoaded: false,
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
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>{episode.name}</h1>
              <hr />
              <p className="m-0">
                {episode.episode} | {episode.air_date}
              </p>
            </div>
          )}
          {!hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Loading episode...</h1>
            </div>
          )}
          {!hasLoaded && hasError && (
            <div className="col col-12">
              <h1>Error: {errorMessage}</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>

          {/* <div className="col col-12"> */}
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
          {/* </div> */}
        </section>
      </Layout>
    );
  }
}

export default Episode;
