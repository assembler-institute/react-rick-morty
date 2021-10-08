import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
      currentPage: 1,
    };
  }

  componentDidMount = async () => {
    const { page } = this.state;
    this.componentDidUpdateloadEpisodes(page);
  };

  loadEpisodes = () => {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    });
  };
  lessEpisodes = () => {
    const { page } = this.state;
    this.setState({
      page: page - 1,
    });
  };

  componentDidUpdate = async () => {
    const { page, currentPage } = this.state;
    if (page !== currentPage) {
      this.componentDidUpdateloadEpisodes(page);
    }
  };

  componentDidUpdateloadEpisodes = async (page) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${page}`,
      );
      const json = await response.json();

      this.setState((prevState) => ({
        episodes: json.results /* [...prevState.episodes, json.results] */,
        hasLoaded: true,
        page: page,
        currentPage: page,
        paginationInfo: json.info.next,
      }));
    } catch (error) {
      this.setState({
        hasError: true,
      });
    }
  };

  render() {
    const { hasLoaded, hasError, episodes, page } = this.state;
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
            <div className="d-flex justify-content-center">
              {page > 1 && (
                <Button color="primary" variant="contained" onClick={this.lessEpisodes}><ArrowBackIcon/>
                </Button>
              )}
              {page < 3 && (
                <Button color="primary" variant="contained" onClick={this.loadEpisodes}><ArrowForwardIcon/>
                </Button>
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
