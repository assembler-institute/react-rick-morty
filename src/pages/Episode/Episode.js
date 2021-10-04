import axios from "axios";
import React, { Component } from "react";

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
    await this.loadCharacters();
  }

  loadCharacters = () => {
    let episodeId = this.props.match.params.id;

    axios
      .get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then((result) => {
        this.setState({
          episode: result.data.name,
          characters: result.data.characters,
          hasLoaded: true,
        });
      });
  };

  render() {
    const { episode, characters, hasLoaded } = this.state;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <h1>{episode}</h1>
            {hasLoaded &&
              characters.map((character) => (
                <p>{character}</p>
                // <CharacterCard
                //   key={character.id}
                //   id={character.id}
                //   name={character.name}
                //   image={character.image}
                //   species={character.species}
                //   status={character.status}
                //   origin={character.origin}
                //   location={character.location}
                // />
              ))}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
