import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import axios from "axios";
import * as routes from "../../constants/routes";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      paginationInfo: 1,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    const { page } = this.state;
    this.loadEpisodes(page);
  }

  async componentDidUpdate() {
    const { page, paginationInfo } = this.state;

    if (page !== paginationInfo) {
      this.loadEpisodes(page);
    }
  }

  async loadEpisodes(page) {
    const EPISODES_URL = `https://rickandmortyapi.com/api${routes.EPISODE}?page=${page}`;
    axios
      .get(EPISODES_URL)
      .then((response) => {
        const newEpisodes = response.data.results;
        this.setState({ episodes: newEpisodes, hasLoaded: true });
      })
      .catch((error) => {
        this.setState({ hasError: true });
        console.log(error);
      });
  }

  prevPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { episodes, hasLoaded, hasError, page } = this.state;
    return (
      <Layout>
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
          <div className="col col-12">
            <hr />
            <div className="text-center">
              {page > 1 && (
                <button className="btn btn-primary" onClick={this.prevPage}>
                  Prev
                </button>
              )}
              {page < 3 && (
                <button
                  className="btn btn-primary ml-1"
                  onClick={this.nextPage}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
