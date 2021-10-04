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

  async loadCharacters() {
    let episodeId = this.props.match.params.id;
    const EPISODE_URL = `https://rickandmortyapi.com/api/episode/${episodeId}`;

    axios
      .get(EPISODE_URL)
      .then((result) => {
        const newCharacters = result.data.characters;
        const newEpisode = result.data.name;

        axios.all(newCharacters.map((url) => axios.get(url))).then((data) => {
          const res = data.map((i) => i.data);

          this.setState({
            episode: newEpisode,
            characters: res,
            hasLoaded: true,
          });
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { episode, characters, hasLoaded } = this.state;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <h1>{episode}</h1>
            {hasLoaded &&
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
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
