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
    this.setPage = this.setPage.bind(this)
  }

  async componentDidMount() {
    const { page } = this.state
    await this.loadEpisodes(page);
    this.setState(prevState => ({
      ...prevState,
      hasLoaded: true
    }))

  }

  // is this good???
  async setPage(newPage) {
    await this.loadEpisodes(newPage);
    this.setState(prevState => ({
      ...prevState,
      page: newPage
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
    const { paginationInfo, episodes, hasError, hasLoaded, page } = this.state
    return (
      <Layout>
        <section className="row">
          {!hasLoaded &&
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>)}

          <div div className="col col-12">
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
                  {paginationInfo.prev &&
                    <li className="page-item">
                      <button type="button" onClick={() => this.setPage(page - 1)} className="page-link">Prev</button>
                    </li>
                  }
                  {!paginationInfo.prev &&
                    <li className="page-item disabled">
                      <button type="button" className="page-link">Prev</button>
                    </li>
                  }
                  {Array.from(Array(paginationInfo.pages), (element, index) => (
                    // maneras de hacer esto!!???
                    index + 1 === page ?
                      <li key={index + 1} className="page-item active">
                        <button type="button" className="page-link">{index + 1}</button>
                      </li>
                      : <li key={index + 1} className="page-item">
                        <button type="button" onClick={() => this.setPage(index + 1)} className="page-link">{index + 1}</button>
                      </li>

                  ))}
                  {paginationInfo.next &&
                    <li className="page-item">
                      <button type="button" onClick={() => this.setPage(page + 1)} className="page-link">Next</button>
                    </li>
                  }
                  {!paginationInfo.next &&
                    <li className="page-item  disabled">
                      <button type="button" className="page-link">Next</button>
                    </li>
                  }

                </ul>
              </nav>
            )}
          </div>
        </section>
      </Layout >
    );
  }
}

export default Home;
