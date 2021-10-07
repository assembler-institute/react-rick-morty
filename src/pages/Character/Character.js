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

    this.loadCharacter = this.loadCharacter.bind(this);
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
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-4">
              <img
                className="CharacterCard__img"
                src={character.image}
                alt=""
              />
            </div>
            <div className="col col-8">
              <div className="row">
                <div className="col col-12">
                  <h3>{character.name}</h3>
                </div>
                <div className="col col-12">
                  <hr />
                </div>
                <div className="col col-12">
                  <div>
                    <p>CHARACTER</p>
                    <div>
                      <p>{character.species}</p>
                      <p>|</p>
                      <p>{character.status}</p>
                    </div>
                  </div>
                </div>
                <div className="col col-12">
                  <div>
                    <div>
                      <p>ORIGINAL</p>
                      <p>{character.origin.name}</p>
                    </div>
                    <div>
                      <p>LOCATION</p>
                      <p>{character.location.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-12">
              <hr />
            </div>
            <div className="col col-12">
              <h4>Episodes</h4>
            </div>
            <div className="col col-12">
              <hr />
            </div>
            {episode.length > 0 &&
              episode.map((ele) => (
                <EpisodeCard
                  key={ele.data.id}
                  id={ele.data.id}
                  name={ele.data.name}
                  airDate={ele.data.air_date}
                  episode={ele.data.episode}
                />
              ))}
          </section>
        )}
        {hasError && (
          <div className="col col-12">
            <h1>{errorMessage}</h1>
          </div>
        )}
      </Layout>
    );
  }
}

export default Character;
