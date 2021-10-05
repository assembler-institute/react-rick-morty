import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      paginationInfo: null,
      episodes: [],
      hasLoaded: true,
      hasError: false,
      errorMessage: null,

      morePages: true,
      nextPage: 2,
    };

    this.handleNextPage = this.handleNextPage.bind(this)
  }

  componentDidMount() {
    this.loadEpisodes(this.state.page);
  }

  async loadEpisodes(page) {
    const res = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`)
    const newArray = res.data.results
    this.setState({ episodes: newArray })
  }

  async handleNextPage(event) {
    let currentPage = this.state.page
    let movePage = parseInt(event.target.dataset.move)
    let nextPage = currentPage+movePage
    
    let requestTotalPagesAPI = await axios.get(`https://rickandmortyapi.com/api/episode?page=${currentPage}`)
    let totalPagesAPI = requestTotalPagesAPI.data.info.pages
    
    this.setState({ page: nextPage })
    this.loadEpisodes(nextPage)
    this.state.page == totalPagesAPI ? this.setState({ morePages: false }) : this.setState({ morePages: true })
  }

  render() {
    return (
      <Layout>
        <section className="row">
          {this.state.hasLoaded && !this.state.hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {this.state.episodes.map((episode) => (
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

          <div className="d-flex justify-content-center w-100">
            {this.state.page > 1 && <button type="button" className="btn btn-primary mr-2" data-move="-1" onClick={this.handleNextPage}>Load previous page</button>}
            {this.state.morePages === true && <button type="button" className="btn btn-primary" data-move="1" onClick={this.handleNextPage}>Load next page</button>}
          </div>
        </section>
      </Layout>
    );
  }
}

export default withRouter(Home);
