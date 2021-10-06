import React, { Component } from "react";
import { getEpisodes } from "../../api/api";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { NavLink } from "react-router-dom";
import { HOME } from "../../constants/routes";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paginationInfo: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.loadEpisodes();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) this.loadEpisodes();
  }

  async loadEpisodes() {
    const page = Number(this.props.match.params.page);

    try {
      const response = await getEpisodes(page);
      
      this.setState({
        paginationInfo: response.info,
        episodes: response.results,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.message,
      });
    }
  }

  render() {
    const { hasError, hasLoaded, episodes, errorMessage, paginationInfo } = this.state;
    const page = Number(this.props.match.params.page);

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
          {hasLoaded && !hasError && episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
            />
          ))}
          {hasLoaded && hasError && (<p>{errorMessage}</p>)}
          <div className="col col-12">
            <hr />
          </div>
          {paginationInfo && (
            <div className="col col-12 d-flex justify-content-center">
              <NavLink className={`btn btn-primary ${Boolean(paginationInfo.prev) ? null : "disabled"}`} to={`${HOME}${page - 1}`} isActive={() => Boolean(paginationInfo.prev)}>Previous</NavLink>
              <NavLink className={`btn btn-primary ${Boolean(paginationInfo.next) ? null : "disabled"}`} to={`${HOME}${page + 1}`} isActive={() => Boolean(paginationInfo.next)}>Next</NavLink>
            </div>
          )}
          </section>
      </Layout>
    );
  }
}

export default Home;
