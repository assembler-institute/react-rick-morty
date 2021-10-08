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
      // page: 1,
      // paginationInfo: null,
      errorMessage: null,
      next: "",
      prev: "",
      baseURL: `https://rickandmortyapi.com/api/episode?page=1`
    };

    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
  }

  componentDidMount() {
    this.loadEpisodes();
  }

  async nextPage() {
    const { next } = this.state
    await this.setState({
      baseURL: next
    })
    this.loadEpisodes()
  }

  async prevPage() {
    const { prev } = this.state

    await this.setState({
      baseURL: prev
    })
    this.loadEpisodes()
  }

  async loadEpisodes() {
    const { baseURL } = this.state

    try {
      await axios.get(baseURL)
        .then(result => {
          this.setState({
            episodes: result.data.results,
            hasLoaded: true,
            next: result.data.info.next,
            prev: result.data.info.prev
          })
          console.log(result)
        })
    }
    catch (error) {
      this.setState({
        hasError: true,
        errorMessage: "Looks like this shit is not working"
      })
    }





  }

  render() {
    const { episodes, hasLoaded, hasError, errorMessage, } = this.state
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
              episodeId={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
            />
          ))}
          <div className="col col-12">
            <div className="container">{errorMessage}</div>
            <hr />
          </div>
        </section>
        <div>
          <button className="btn btn-primary" type="button" onClick={this.prevPage}> Prev</button >
          <button className="btn btn-primary" type="button" onClick={this.nextPage}>Next</button>
        </div >
      </Layout >
    );
  }
}

export default Home;
