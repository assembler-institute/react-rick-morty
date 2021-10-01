import React, { Component } from "react";
import axios from "axios";

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
    };
  }

  async componentDidMount() {
    this.loadEpisodes();
  }

  async loadEpisodes() {
    axios.get("https://rickandmortyapi.com/api/episode?page=1").then((data) => {
      // this.setState({ episodes: data.data.results });
      const newInfo = data.data.results;
      this.setState((prevState) => ({
        episodes: [...prevState.episodes, newInfo].flat(),
      }));
    });
  }

  render() {
    const {
      page,
      paginationInfo,
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <>
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
          </section>
        </Layout>
      </>
    );
  }
}

export default Home;
