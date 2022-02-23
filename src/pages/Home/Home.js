import axios from "axios";
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
      hasLoaded: true,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    const { page } = this.state
    await this.loadEpisodes(page);
    this.setState(prevState => ({
      ...prevState,
      isLoading: false
    }))

  }

  async loadEpisodes(page) {
    console.log(this);
    await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then(data => {
        const dataRequest = data.data
        return (
          this.setState((prevState) => ({
            ...prevState,
            paginationInfo: dataRequest.info,
            episodes: dataRequest.results,
          }))
        );
      })
  }

  render() {
    const { paginationInfo, episodes, hasError, hasLoaded } = this.state
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
          {
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
          <div className="col col-12">
            <hr />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
