import React, { Component } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { API, EPISODE } from "../../constants/routes";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      paginationInfo: { prev: null, next: null },
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    this.loadEpisodes();
  }

  componentDidUpdate() {
    this.loadEpisodes();
  }

  loadEpisodes() {
    const { page } = this.state;
    axios
      .get(`${API}${EPISODE}?page=${page}`)
      .then((data) => {
        const newInfo = data.data.results;
        this.setState({
          episodes: newInfo,
          hasLoaded: true,
          hasError: false,
          paginationInfo: {
            next: data.data.info.next,
            prev: data.data.info.prev,
          },
        });
      })
      .catch((error) => {
        this.setState({
          hasLoaded: false,
          hasError: true,
          errorMessage: error,
        });
      });
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
      <>
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
            <div className="d-flex justify-content-between w-100">
              <button
                type="button"
                className="btn btn-primary"
                disabled={!paginationInfo.prev}
                onClick={() => this.setState({ page: page - 1 })}
              >
                Load previous page
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!paginationInfo.next}
                onClick={() => this.setState({ page: page + 1 })}
              >
                Load next page
              </button>
            </div>
          </section>
        </Layout>
      </>
    );
  }
}

export default Home;
