import React, { Component } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // page: 1,
      // paginationInfo: null,
      episodes: [],
      hasLoaded: true,
      hasError: false,
      // errorMessage: null,
    };
  }

  async componentDidMount() {
    await this.loadEpisodes();
  }

  async loadEpisodes() {
    const res = await axios.get("https://rickandmortyapi.com/api/episode");
    this.setState({
      episodes: res.data.results,
    });
  }

  render() {
    const { hasLoaded, hasError, episodes } = this.state;
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
          <div>
            <button type="button" className="btn btn-primary m-1">
              Previous page
            </button>
            <button type="button" className="btn btn-primary m-1">
              Next page
            </button>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
