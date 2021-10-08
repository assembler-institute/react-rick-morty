/* eslint-disable no-console */
import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseURL: "https://rickandmortyapi.com/api/episode?page=1",
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
      page: 1,
      next: null,
      prev: null,
    };
  }

  async componentDidMount() {
    this.loadEpisodes();
  }

  async nextHandler() {
    const { next } = this.state;
    await this.setState({
      baseURL: next,
    });
    this.loadEpisodes();
  }

  async prevHandler() {
    const { prev } = this.state;
    await this.setState({
      baseURL: prev,
    });
    this.loadEpisodes();
  }

  async loadEpisodes() {
    console.log(this);

    const { baseURL } = this.state;
    const currentPage = baseURL.slice(-1);

    try {
      const APIcall = await axios.get(baseURL);
      console.log(APIcall);
      this.setState({
        episodes: APIcall.data.results,
        page: currentPage,
        next: APIcall.data.info.next,
        prev: APIcall.data.info.prev,
        hasLoaded: true,
      });
    } catch (err) {
      this.setState({
        hasError: false,
        errorMessage: "Episodes not found!!",
      });
    }
  }

  render() {
    const {
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
      prev,
      next,
      page,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          <div className="col col-6">
            {hasLoaded && !hasError ? (
              <h1>Episodes loaded!</h1>
            ) : (
              <h1>{errorMessage}</h1>
            )}
          </div>
          <div className="col col-6">
            <div className="row">
              {prev && (
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => this.prevHandler()}
                >
                  <span role="img" aria-label="prev">
                    ⏪
                  </span>
                </button>
              )}

              <h1>{page}</h1>
              {next && (
                <button
                  className="btn btn-light"
                  type="button"
                  onClick={() => this.nextHandler()}
                >
                  <span role="img" aria-label="next">
                    ⏩
                  </span>
                </button>
              )}
            </div>
          </div>
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
