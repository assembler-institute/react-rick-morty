import React, { Component } from "react";

import { getEpisodes } from "../../api";

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
    this.loadEpisodes = this.loadEpisodes.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
  }

  /*
  * Esta funcion viene predefinida por react y se ejecutará al inicio de la APP por defecto
  */
  componentDidMount() {
    const { page } = this.state;
    this.loadEpisodes(page);
  }

  componentDidUpdate(_prevProps, prevState){
    const { page } = this.state;
    const { page: prevPage } = prevState;

    // console.log({page});
    // console.log({prevPage});
    // console.log("----");

    if( prevPage !== page ){
      this.loadEpisodes(page);
    }
  }

  /*
  * funcion inicial para cargar los episodios
  */
  async loadEpisodes(page) {
    // console.log(this);
    try {
      // console.log(data);
      /*
       * la constante data la creamos mediante destructuring, para obtener la funcion creada en Api.js
      */
      const { data } = await getEpisodes(page);
      /*
       * El siguiente State, te recoge desde el API los episodios
       * Pero solo te muestra una "version" de los episodios por pagina
      */
      // this.setState({
      //   paginationInfo: data.info,
      //   episodes: data.results,
      //   hasLoaded: true,
      // });
      /*
       * En cambio el siguiente State, te va copiando los anteriores episodios y no los sustituye, si no que
       * Los añade a continuación ya que "copiamos" los capitulos en el prevState
      */
      this.setState((prevState)=>({
        paginationInfo: data.info,
        episodes: [ ...prevState.episodes, ...data.results ],
        hasLoaded: true,
      }));
    } catch (error) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.message,
      });
    }
  }

  loadNextPage() {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
    // console.log(this);
  }

  render() {
    const {
      paginationInfo,
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>Something went wrong!</h1>
              <p>{errorMessage}</p>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <h1>Loading Episodes...</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {/* <div className="col col-12">
            {JSON.stringify(episodes, null, 2)}
          </div> */}
          {episodes.length > 0 &&
            episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
            ))}
          <div className="col col-12">
            <hr />
          </div>
          <div className="col col-12">
            <button
            className="btn btn-primary"
              type="button"
              disabled={ paginationInfo && !paginationInfo.next}
              onClick={this.loadNextPage} >Next</button>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
