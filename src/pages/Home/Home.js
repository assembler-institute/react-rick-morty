import React, { Component } from "react";

import { EPISODE, URL } from "../../constants/routes";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

const axios = require("axios");

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
    this.loadMore = this.loadMore.bind(this);
  }

  async componentDidMount() {
    const { page } = this.state;
    await this.loadEpisodes(page);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { page: prevPage } = prevState;
    const { page } = this.state;
    if (prevPage !== page) {
      this.loadEpisodes(page);
    }
  }

  loadMore() {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  }

  async loadEpisodes(page) {
    try {
      const response = await axios.get(`${URL}${EPISODE}?page=${page}`);
      const data = response.data.results;
      const info = response.data.info;
      this.setState((prevState) => ({
        paginationInfo: info,
        hasLoaded: true,
        episodes: [...prevState.episodes, ...data],
      }));
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        hasError: true,
      });
    }
  }

  render() {
    const {
      hasLoaded,
      hasError,
      errorMessage,
      episodes,
      paginationInfo,
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
              <h1>Something went wrong...</h1>
              <h2 className="errorMessage">{errorMessage}</h2>
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
              gettingId={this.gettingId}
            />
          ))}
          <div className="col col-12">
            <hr />
          </div>
        </section>

        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            disabled={paginationInfo && !paginationInfo.next}
            onClick={this.loadMore}
          >
            Load more
          </button>
        </div>
      </Layout>
    );
  }
}

export default Home;
