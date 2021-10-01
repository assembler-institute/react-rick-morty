import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      paginationInfo: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.loadEpisodes();
  }

  loadNextPage = () => {
    this.setState((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }))

    this.loadEpisodes()
  }


  loadEpisodes = async () => {
    try {
      const { page } = this.state;

      const url = `https://rickandmortyapi.com/api/episode?page=${page}`;
      const result = await fetch(url)
      const { results, info } = await result.json();

      this.setState((prevState) => ({
        episodes: [...prevState.episodes, ...results],
        hasLoaded: true,
        paginationInfo: info
      }))

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
    const { episodes, errorMessage, hasLoaded, hasError, page, paginationInfo } = this.state;

    return (
      <Layout>
        {errorMessage}
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
            />
          ))}
          <div className="col col-12 text-center">
            <hr />
            {
              paginationInfo &&
              paginationInfo.pages &&
              (paginationInfo.pages !== page - 1) &&
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.loadNextPage}
              >
                Load more
              </button>
            }
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
