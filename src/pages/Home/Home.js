import React, { Component } from "react";
import axios from "axios";
import * as Routes from "../../constants/routes";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
      next: "",
      prev: null,
    };
  }

  async componentDidMount() {
    await this.loadEpisodes();
  }

  async loadEpisodes(param = Routes.API + Routes.EPISODE) {
    try {
      const res = await axios.get(param);

      this.setState({
        episodes: res.data.results,
        hasLoaded: true,
        next: res.data.info.next,
        prev: res.data.info.prev,
      });
    } catch (e) {
      this.setState({
        hasError: true,
        errorMessage: "Error, episodes not loaded",
      });
    }
  }

  render() {
    const {
      hasLoaded,
      hasError,
      episodes,
      errorMessage,
      prev,
      next,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
              <div className="col col-12">
                <hr />
              </div>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>{errorMessage}</h1>
            </div>
          )}

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
          </div>
          {hasLoaded && !hasError && prev && (
            <div>
              <button
                type="button"
                onClick={() => this.loadEpisodes(prev)}
                className="btn btn-primary m-1"
              >
                Previous page
              </button>
            </div>
          )}
          {hasLoaded && !hasError && next && (
            <button
              type="button"
              onClick={() => this.loadEpisodes(next)}
              className="btn btn-primary m-1"
            >
              Next page
            </button>
          )}
        </section>
      </Layout>
    );
  }
}

export default Home;
