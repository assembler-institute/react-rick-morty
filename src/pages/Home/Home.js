import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

import { getEpisodes } from "../../api/api";

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

  async componentDidMount() {
    this.loadEpisodes();
  }

  async componentDidUpdate(_prevProps, prevState) {
    const { page } = this.state;
    if (prevState.page !== page) {
      this.loadEpisodes();
    }
  }

  async loadEpisodes() {
    try {
      const { page } = this.state;
      const { data } = await getEpisodes(page);
      // console.log(data);
      this.setState((prevState) => {
        return {
          episodes: [...prevState.episodes, ...data.results],
          hasLoaded: true,
          paginationInfo: data.info,
        };
      });
    } catch (error) {
      this.setState({
        hasLoaded: false,
        hasError: true,
        errorMessage: error.message,
      });
    }
  }

  loadNextPage() {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });
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
          {!hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Loading episodes...</h1>
            </div>
          )}
          {!hasLoaded && hasError && (
            <div className="col col-12">
              <h1>Error: {errorMessage}</h1>
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

          <button
            onClick={this.loadNextPage}
            className="btn btn-primary mx-auto"
            type="button"
          >
            Load next page
          </button>
        </section>
      </Layout>
    );
  }
}

export default Home;
