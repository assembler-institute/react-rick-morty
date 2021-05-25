import React, { Component } from "react";
import { getEpisodes, getCharacter } from "../../api";
import EpisodeCard from "../../components/EpisodeCard";

import Layout from "../../components/Layout";
// import EpisodeCard from "../../components/EpisodeCard";

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
  }

  async componentDidMount() {
    console.clear();
    const { page } = this.state;
    this.loadEpisodes(page);
  }

  async loadEpisodes(page) {
    console.log(this);

    try {
      const { data } = await getEpisodes(page);
      console.log(data);

      this.setState({
        paginationInfo: data.info,
        episodes: data.results,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.message,
      });
    }
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
          {/* <div className="col col-12">{JSON.stringify(episodes, null, 2)}</div> */}
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
