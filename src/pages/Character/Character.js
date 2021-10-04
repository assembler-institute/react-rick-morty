import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import * as api from "../../constants/api";

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      episode: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.loadCharacter(id);
  }

  async loadCharacter(id) {
    const response = await axios.get(`${api.CHARACTER_URL}/${id}`);
    const characterResponse = response.data;
    const episodeUrls = response.data.episode;
    const requests = episodeUrls.map((episodeUrl) =>
      axios.get(episodeUrl).catch((err) => null),
    );
    try {
      const episodes = await axios.all(requests);
      this.setState({
        episode: episodes,
        character: characterResponse,
        hasLoaded: true,
      });
    } catch (err) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: err.message,
      });
    }
    // console.log(this);
  }

  render() {
    // console.log(this.props);
    const {
      episode,
      character,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <p>Character page</p>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Character loaded!</h1>
              <h2>{character.name}</h2>
              <h4>{character.status}</h4>
              <h4>{character.species}</h4>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>{errorMessage}</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {episode.map((ele) => (
            <EpisodeCard
              key={ele.data.id}
              id={ele.data.id}
              name={ele.data.name}
              airDate={ele.data.air_date}
              episode={ele.data.episode}
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

export default Character;
