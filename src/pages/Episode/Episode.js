import React, { Component } from "react";

import Layout from "../../components/Layout";
// import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: props.episode,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  loadEpisode = async () => {
    try {
      const { episode } = this.state;

      const url = `https://rickandmortyapi.com/api/episode/${episode}`;
      const result = await fetch(url)

      console.log(result)

      // const { results, info } = await result.json();

      // this.setState((prevState) => ({
      //   episode: [...prevState.episode, ...results],
      //   hasLoaded: true,
      //   characters: []
      // }))

    } catch (error) {
      this.setState(() => ({
        hasError: true,
        errorMessage: error
      }))
    }

    // const pokemons = await fetch(url);
    // const jsonPokemons = await pokemons.json();

    // let arrayPokemons = await Promise.all(
    //   jsonPokemons.results.map(async (pokemon) => {
    //     let pokemonResponse = await fetch(pokemon.url);
    //     return pokemonResponse.json()
    //   })
    // );

  }

  render() {
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            {/* {characters.map((character) => (
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
            ))} */}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
