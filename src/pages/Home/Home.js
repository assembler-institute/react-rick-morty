/* eslint-disable no-console */
import React, { Component } from "react";
import axios from "axios"

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
      hasLoaded: false,
      hasError: false,
      page: 1,
      // paginationInfo: null,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    // this.loadEpisodes();
    const { page } = this.state
    const url = `https://rickandmortyapi.com/api/episode?page=${page}`
    try {
      await axios.get(url)
        .then(result => {
          this.setState({
            episodes: result.data.results,
            hasLoaded: true
          })
        })
    }
    catch (error) {
      this.setState({
        hasError: true,
        errorMessage: "Looks like this shit is not working"
      })
    }
  }



  async loadEpisodes() {
    console.log(this);

  }

  render() {
    const { episodes, hasLoaded, hasError, errorMessage } = this.state
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
            <div className="container">{errorMessage}</div>
            <hr />
            {/* <button className="btn btn-primary" type="button">More episodes</button> */}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
