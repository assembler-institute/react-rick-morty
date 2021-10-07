import React, { Component } from "react";

import { getEpisodes } from "../../Api";

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
  }

    this.loadEpisodes = this.loadEpisodes.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.loadPrevPage = this.loadPrevPage.bind(this);
}
  async componentDidMount() {
    const { page } = this.state;
    this.loadEpisodes();
  }

  async loadEpisodes(page) {
    try {
      const { data } = await getEpisodes(page);
      this.setState({
        paginationInfo: data.info,
        episodes: data.results,
        hasLoaded: true,
      });
    } catch (e) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: e.message,
      });
    }
  }
  loadPrevPage() {
    this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
  }

  loadNextPage() {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
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
        {!hasLoaded && (
            <div className="col col-12">
              <p>Location not loaded...</p>
            </div>
          )}
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Location error...</p>
              <p>{errorMessage}</p>
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
          <div className="col col-12">
            <hr />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
