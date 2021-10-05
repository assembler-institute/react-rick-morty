import React, { Component } from "react";
import axios from "axios";
import * as Routes from "../../constants/routes";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // page: 1,
      // paginationInfo: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    await this.loadEpisodes();
  }

  async loadEpisodes() {
    try {
      const res = await axios.get(Routes.API + Routes.EPISODE);

      this.setState({
        episodes: res.data.results,
        hasLoaded: true,
      });
    } catch (e) {
      this.setState({
        hasError: true,
        errorMessage: "Error, episodes not loaded",
      });
    }
  }

  render() {
    const { hasLoaded, hasError, episodes, errorMessage } = this.state;
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
          {hasLoaded && !hasError && (
            <div>
              <button
                type="button"
                // eslint-disable-next-line no-console
                onClick={() => console.log("previous")}
                className="btn btn-primary m-1"
              >
                Previous page
              </button>
              <button
                type="button"
                // eslint-disable-next-line no-console
                onClick={() => console.log("previous")}
                className="btn btn-primary m-1"
              >
                Next page
              </button>
            </div>
          )}
        </section>
      </Layout>
    );
  }
}

export default Home;
