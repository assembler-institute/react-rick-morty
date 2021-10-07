/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // episode: null,
      characters: [],
      // hasLoaded: false,
      // hasError: false,
      // errorMessage: null,
    };
  }

  async componentDidMount(){
    await this.loadCharacters();
  }

  async loadCharacters(){
    // console.log(this.props.match.params.episodeId);
    const episodeId= this.props.match.params.episodeId;
    const URL_EPISODE = `https://rickandmortyapi.com/api/episode/${episodeId}`
    const llamada = await axios.get(URL_EPISODE);
    const arr = llamada.data.characters;
    const arr2 = await axios.all(arr.map((character) => axios.get(character)))
    console.log(arr2);
    this.setState({
      characters: arr2
    })
  }

  render() {
    const { characters } = this.state;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            {characters.map((character) => (
              <CharacterCard
                key={character.data.id}
                characterId={character.data.id}
                name={character.data.name}
                image={character.data.image}
                species={character.data.species}
                status={character.data.status}
                origin={character.data.origin}
                location={character.data.location.url}
              />
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
