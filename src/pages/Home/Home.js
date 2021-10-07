/* eslint-disable no-console */
import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
    // page: 1,
    // paginationInfo: null,
  }

  async componentDidMount() {
    this.loadEpisodes();
  }

  async loadEpisodes() {
    console.log(this);

    const baseURL = "https://rickandmortyapi.com/api/episode?page=1";
    try {
      const APIcall = await axios.get(baseURL);
      this.setState({
        episodes: APIcall.data.results,
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
    const { episodes, hasLoaded, hasError, errorMessage } = this.state;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            {hasLoaded && !hasError ? (
              <h1>Episodes loaded!</h1>
            ) : (
              <h1>{errorMessage}</h1>
            )}
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
