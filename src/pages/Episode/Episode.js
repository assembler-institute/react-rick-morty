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
      hasLoaded: true,
      hasError: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    this.loadCharacters();
  }

  async loadCharacters() {
    let episodeId = window.location.pathname.slice(9)
    const res = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)

    let newArray = []
    await res.data.characters.forEach(urlCharacter => {
      axios.get(urlCharacter)
        .then(response => newArray.push(response.data))
    })

    //! NO TIMEOUT
    setTimeout(() => {
      this.setState({characters: newArray})
    }, 50)
  }

  render() {
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            {this.state.characters.map((character) => (
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
