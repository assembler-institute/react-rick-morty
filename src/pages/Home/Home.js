import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.search = props.location.search
    // disabled for error in URLSearchParams
    // eslint-disable-next-line compat/compat
    this.page = parseInt(new URLSearchParams(this.search).get("page"), 10) // returns string, needs parseInt 
    this.state = {
      page: this.page ? this.page : 1,
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

  checkPageActive(index) {
    const { page } = this.state
    if (index === page) {
      return (
        <li key={index} className="page-item active">
          <a className="page-link " href={`?page=${index}`}>{index}</a>
        </li>
      )
    }
    return (
      <li key={index + 1} className="page-item">
        <a className="page-link" href={`?page=${index}`}>{index}</a>
      </li>
    )
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
                      <a className="page-link" href={`?page=${page - 1}`}>Prev</a>
                    </li>
                  }
                  {!paginationInfo.prev &&
                    <li className="page-item disabled">
                      <a className="page-link" href={`?page=${page - 1}`}>Prev</a>
                    </li>
                  }
                  {Array.from(Array(paginationInfo.pages), (element, index) => (
                    // maneras de hacer esto!!???
                    this.checkPageActive(index + 1)
                  ))}
                  {paginationInfo.next &&
                    <li className="page-item">
                      <a className="page-link" href={`?page=${page + 1}`}>Next</a>
                    </li>
                  }
                  {!paginationInfo.next &&
                    <li className="page-item  disabled">
                      <a className="page-link" href={`?page=${page + 1}`}>Next</a>
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

export default withRouter(Home);
