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
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.loadEpisodes();
  }

  async loadEpisodes() {
    axios
      .get("https://rickandmortyapi.com/api/episode?page=1")
      .then((response) => {
        const newEpisodes = response.data.results;
        this.setState({
          episodes: newEpisodes,
          hasLoaded: true,
        });
      })
      .catch((error) => {
        this.setState({ hasError: true });
        console.log(error);
      });
    console.log(this);
  }

  render() {
    const { episodes, hasError, hasLoaded } = this.state;
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
        </section>
      </Layout>
    );
  }
}

export default Home;
