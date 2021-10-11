import React, { Component } from "react";

import { EpisodeCard, Layout } from "components";

import episodesApi from "api/episodes";

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

  componentDidMount() {
    const { page } = this.state;
    this.loadEpisodes(page);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { page: prevPage } = prevState;
    const { page } = this.state;
    if (prevPage !== page) {
      this.loadEpisodes(page);
    }
  }

  loadNextPage = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  }

  loadEpisodes = async (page) => {
    try {
      const { data: { results, info } } = await episodesApi.getAllEpisodes(page);

      this.setState((prevState) => ({
        episodes: [...prevState.episodes, ...results],
        hasLoaded: true,
        paginationInfo: info
      }))

    } catch (error) {
      this.setState(() => ({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.message
      }))
    }
  }

  render() {
    const { episodes, errorMessage, hasLoaded, hasError, paginationInfo } = this.state;

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
          {episodes.length > 0 &&
            episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
            ))
          }
          <div className="col col-12 text-center">
            <hr />
            <button
              type="button"
              className="btn btn-primary"
              disabled={paginationInfo && !paginationInfo.next}
              onClick={this.loadNextPage}
            >
              Load more
            </button>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
