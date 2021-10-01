import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

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

  async componentDidMount() {
    const { page } = this.state;
    this.componentDidUpdateloadEpisodes(page);
  }

  async loadEpisodes() {
    console.log(this);
  }

  async componentDidUpdateloadEpisodes(page) {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${page}`,
      );
      const json = await response.json();

      this.setState({
        episodes: json.results,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
      });
    }



    /*fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          episodes: json.results,
          hasLoaded: true,
        }),
      )
      .catch((error) => {
        this.setState({
          hasError: true,
        });
        console.log(error);
      });*/
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
              characters={episode.characters}
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
