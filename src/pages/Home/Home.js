import React, { Component } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      // paginationInfo: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
  }

  componentDidMount() {
    this.loadEpisodes();
  }

  componentDidUpdate() {
    this.loadEpisodes();
  }

  handleNextPage() {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    });
  }

  handlePrevPage() {
    const { page } = this.state;
    this.setState({
      page: page - 1,
    });
  }

  async loadEpisodes() {
    try {
      const { page, episodes, hasLoaded, hasError, errorMessage } = this.state;
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode?page=${page}`,
      );

      this.setState({
        episodes: response.data.results,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        errorMessage: error,
        hasError: true,
      });
    }
  }

  render() {
    const { page, episodes, hasLoaded, hasError, errorMessage } = this.state;
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
          </div>

          <div className="col col-12 btn-group btn-group-justified">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handlePrevPage}
              disabled={page === 1 && true}
            >
              Previous Page
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handleNextPage}
              disabled={page === 3 && true}
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
