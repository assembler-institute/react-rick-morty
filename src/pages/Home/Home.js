import React, { Component } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../api";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
      nextUrl: null,
      prevUrl: null,
      hasLoaded: false,
      hasError: false
    }

    this.loadEpisodes = this.loadEpisodes.bind(this)
    this.handlePagination = this.handlePagination.bind(this)
  }
  
  componentDidMount() {
    this.loadEpisodes({})
  }

  handlePagination(event) {
    const { nextUrl, prevUrl } = this.state
    event.preventDefault()
    event.target.getAttribute('data-pagination') === 'next' ? 
    this.loadEpisodes({url: nextUrl}) : 
    this.loadEpisodes({url: prevUrl}) 
  }

  async loadEpisodes({url = undefined}) {
    // Get episodes
    const { currentPage } = this.state
    const apiUrl = url || `https://rickandmortyapi.com/api/episode?page=${currentPage}`

    const [response, error] = await makeRequest(apiUrl)

    if (!error) this.setState({
      episodes: response.data.results, 
      hasLoaded: true, 
      hasError: false,
      nextUrl: response.data.info.next,
      prevUrl: response.data.info.prev,        
    })
    if (error) this.setState({hasError: true, hasLoaded: false})  
  }

  render() {
    const {hasLoaded, hasError, episodes, nextUrl, prevUrl, currentPage} = this.state

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
          <div className="col col-12">
            <nav aria-label="Rick And Morty navigation example">
              <div className="pagination justify-content-between">
                {prevUrl && !hasError && (
                <li className="page-item">
                  <Link 
                  className="page-link" 
                  data-pagination='prev' 
                  to='/' 
                  onClick={this.handlePagination}>Prev</Link>
                </li>
                )}
                {nextUrl && !hasError && (
                <li className="page-item">
                  <Link 
                  className="page-link" 
                  data-pagination='next' 
                  to='/' 
                  onClick={this.handlePagination}>Next</Link>
                  </li>)}
              </div>
            </nav>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
