/* eslint-disable react/destructuring-assignment */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import React, { Component } from "react";
import axios from "axios"


import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";


class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      // episode: null,
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadCharacters = this.loadCharacters.bind(this)

  }

  async componentDidMount() {
    await this.loadCharacters()
  }



  async loadCharacters() {
    // console.log(this.props)
    const episodeId = this.props.match.params.episodeId

    const url = `https://rickandmortyapi.com/api/episode/${episodeId}`
    try {
      const res = await axios.get(url)
      // console.log(res)
      const arr = await axios.all(res.data.characters.map((e) => axios.get(e)))
      // console.log(arr)
      const arr2 = arr.map((e) => e.data)
      // console.log(arr2)
      this.setState({
        characters: arr2,
        hasLoaded: true
      })
    }

    catch (error) {
      // console.log(error)
      this.setState({
        hasError: true,
        errorMessage: "This shit is kinda kidding you!"
      })
    }
  }



  render() {
    const { characters, hasLoaded, hasError, errorMessage } = this.state
    return (
      <Layout>
        <section className="row">
          <div className="row">
            {hasLoaded && characters.map((character) => (
              <CharacterCard
                key={character.id}
                characterId={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
                status={character.status}
                origin={character.origin}
                location={character.location}
              />
            ))}
          </div>
          <div className="container">{hasError && errorMessage}</div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
