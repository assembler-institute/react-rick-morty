import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { EPISODE, URL } from "../../constants/routes";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import Episode from "../Episode";

const axios = require("axios");

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /* page: 1,
      paginationInfo: null, */
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadEpisodes = this.loadEpisodes.bind(this);
  }

  async componentDidMount() {
    await this.loadEpisodes();
  }

  async loadEpisodes() {
    try {
      const response = await axios.get(`${URL}${EPISODE}`);
      const data = response.data.results;
      this.setState({
        hasLoaded: true,
        episodes: data,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        hasError: true,
      });
    }
  }

  render() {
    const { hasLoaded, hasError, errorMessage, episodes } = this.state;
    const { id } = episodes;
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/episode/">
              <Episode id={id} />
            </Route>

            <Route path="/" exact>
              <Layout>
                <section className="row">
                  {hasLoaded && !hasError && (
                    <div className="col col-12">
                      <h1>Episodes loaded!</h1>
                    </div>
                  )}

                  {hasError && (
                    <div className="col col-12">
                      <h1>Something went wrong...</h1>
                      <h2 className="errorMessage">{errorMessage}</h2>
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
                </section>
              </Layout>
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default Home;
