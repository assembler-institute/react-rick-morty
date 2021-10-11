import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

import axiosGet from "../../utils/axiosRequest";
import { urlArr } from "../../utils/axiosRequest";
// import { pages } from "../../utils/axiosRequest";

import { episodeArrLength } from "../../utils/axiosRequest";
// import { locationArrLength } from "../../utils/axiosRequest";
// import { charactersArrLength } from "../../utils/axiosRequest";

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
    this.loadEpisodes = this.loadEpisodes.bind(this);
    // this.loadNextEpisodes = this.loadNextEpisodes.bind(this);
  }

  async componentDidMount() {
    this.loadEpisodes();
  }

  // async componentDidUpdate() {
  //   this.nextPage();
  // }

  async loadEpisodes() {
    return await axiosGet(urlArr[0], episodeArrLength[1+n]).then((res) =>
      this.setState({
        episodes: res.data.results,
        hasLoaded: true,
        hasError: false,
        page: 1,
      }),
    );
  }

  async loadNextEpisodes() {
    return await axiosGet(urlArr[0]).then((res) =>
      this.setState({
        episodes: res.data.results,
        hasLoaded: true,
        hasError: false,
        page: 2,
      }),
    );
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
              episodeId={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
            />
          ))}
          <div className="col col-12">
            <hr />
            <button
              type="button"
              onClick={() => {
                console.log("Hallo");
              }}
            >
              Click me!
            </button>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
