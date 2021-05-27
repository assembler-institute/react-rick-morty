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

  componentDidMount() {
    const { page } = this.state;
    this.loadEpisodes(page);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { page: prevPage } = prevState;
    const { page } = this.state;

    if (page !== prevPage) {
      this.loadEpisodes(page);
    }
  }

  async loadEpisodes() {
    const { page } = this.state;
    try {
      const { data } = await getEpisodes(page);

      this.setState((prevState) => ({
        paginationInfo: data.info,
        episodes: [...prevState.episodes, ...data.results],
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
  }

  render() {
    const {
      page,
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
              <h1>Something went wrong</h1>
              <p>{errorMessage}</p>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <h1>Loading episodes,...</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {/* <div className="col col-12">{JSON.stringify(episodes, null, 2)}</div> */}
          {/* Comprobar porque no hace el render de <EpisodeCard> Minuto 15 de el Life Coding */}
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
              type="button"
              className="btn btn-primary"
              disabled={paginationInfo && !paginationInfo.next}
              onClick={this.loadNextPage}
            >
              Next Page
            </button>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
