import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { getEpisodes } from "../../api";

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
    this.loadEpisodes();
  }

  async loadEpisodes() {
    try {
      const data = await getEpisodes();

      this.setState(prevState => ({
        ...prevState,
        hasLoaded: true,
        paginationInfo: data.info,
        episodes: data.results,
      }))
    } catch (error) {
      this.setState(prevState => ({
        ...prevState,
        hasError: true,
        errorMessage: error.message,
      }))
    }
  }

  render() {
    const { hasError, hasLoaded, episodes } = this.state;

    return (
      <Layout>
        <section className="row d-flex">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>List of episodes <img src="https://cdn140.picsart.com/271010551004211.png?type=webp&to=min&r=640" width="150px"/></h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {hasLoaded && !hasError && episodes.map((episode) => (
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
          {}
        </section>
      </Layout>
    );
  }
}

export default Home;
