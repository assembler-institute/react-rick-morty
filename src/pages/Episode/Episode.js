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
      // episode: null
      // hasLoaded: false,
      // hasError: false,
      // errorMessage: null,
    };


  }

  async componentDidMount() {
    const url = `https://rickandmortyapi.com/api/episode/1`
    try {
      await axios.get(url)
        .then(result => {
          console.log(result)
          this.setState({
            // characters: result.data.results
          })

        })
    }
    catch (error) {
      console.log(error)
      this.setState({
        // hasError: true,
        // errorMessage: "Alfredo tequivocaaati"
      })
    }

  }

  render() {
    const { characters } = this.state
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
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
        </section>
      </Layout>
    );
  }
}

export default Episode;
