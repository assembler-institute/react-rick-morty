import axios from "axios";
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
    const { page } = this.state
    await this.loadEpisodes(page);
    this.setState(prevState => ({
      ...prevState,
      hasLoaded: true
    }))

  }

  async loadEpisodes(page) {
    const dataRequest = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then(data => {
        return data.data
      })
    return (
      this.setState((prevState) => ({
        ...prevState,
        paginationInfo: dataRequest.info,
        episodes: dataRequest.results,
      }))
    );
  }


  render() {
    const { paginationInfo, episodes, hasError, hasLoaded } = this.state
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
          {
            episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
            ))
          }
          <div className="col col-12">
            <hr />
            {hasLoaded && (
              <nav aria-label="...">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a className="page-link">Previous</a>
                  </li>
                  {Array.from(Array(paginationInfo.pages), (element, index) => (

                    <li key={index + 1} className="page-item"><a className="page-link" href="#">{index + 1}</a></li>

                  ))}
                  <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                  </li>

                </ul>
              </nav>
            )}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
