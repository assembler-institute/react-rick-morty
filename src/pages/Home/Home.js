import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import axios from "axios";

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
    this.loadEpisodes();
  }

  async loadEpisodes() {
    const res = await axios.get("https://rickandmortyapi.com/api/episode?page=1")
    const newArray = res.data.results
    this.setState({episodes: newArray})
  }

  render() {
    return (
      <Layout>
        <section className="row">
          {this.state.hasLoaded && !this.state.hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {this.state.episodes.map((episode) => (
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
