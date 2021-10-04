import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { getEpisodes } from "../../utils/axios";

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
      currentPagesLoader:1
    };
    this.loadNextPage = this.loadNextPage.bind(this);
    this.loadEpisodes = this.loadEpisodes.bind(this);
  }

  async componentDidMount() {
    const { page } = this.state;
    this.loadEpisodes(page);
  }

  async loadEpisodes(page){
    try {
      const response  = await getEpisodes(page);
      this.setState({
        paginationInfo: response.info,
        episodes: response.data.results,
        hasLoaded: true,
        page:page,
        currentPagesLoader:page
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        hasLoaded: false,
        hasError: true,
      });
    }
  }
  componentDidUpdate(){
    if(this.state.page!==this.state.currentPagesLoader){
    this.loadEpisodes(this.state.page)
    }
  }
  async loadNextPage() {
      const { page}=this.state
    this.setState({
      page: this.state.page+1
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
          {episodes &&
            episodes.map((episode) => (
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
            <button className="btn btn-primary" onClick={this.loadNextPage}>
              {" "}
              Load next page
            </button>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
