import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import * as api from "../../constants/api";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // page: 1,
      paginationInfo: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadEpisodes = this.loadEpisodes.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  async componentDidMount() {
    const url = api.BASE_URL;
    this.loadEpisodes(url);
  }

  async loadEpisodes(url) {
    try {
      await axios.get(url).then((res) => {
        const episodes = res.data.results;
        const pageInfo = res.data.info;
        this.setState({
          episodes: episodes,
          hasLoaded: true,
          paginationInfo: pageInfo,
        });
      });
    } catch (err) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: err.message,
      });
    }
    // console.log(this);
  }

  nextPage(nextUrl) {
    this.loadEpisodes(nextUrl);
  }

  prevPage(prevUrl) {
    this.loadEpisodes(prevUrl);
  }

  render() {
    const {
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
      paginationInfo,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>{errorMessage}</h1>
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
            ))}
          <div className="col col-12 justify-content-center">
            <hr />
          </div>
          <div className="col col-12">
            <nav>
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => this.prevPage(paginationInfo.prev)}
                  >
                    Previous
                  </button>
                </li>
                <li className="page-item">
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => this.nextPage(paginationInfo.next)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
