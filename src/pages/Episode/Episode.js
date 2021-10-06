import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import { getEpisode } from "../../utils/axios";
import axios from "axios";
class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.loadEpisode(params.episodeId);
  }

  async loadEpisode(episodeId) {
    try {
      const response = await getEpisode(episodeId);
      this.setState({
        episode: response.data,
        hasLoaded: true,
      });

      const { episode } = this.state;
      const res = await axios.all(
        episode.characters.map(async (cUrl) => {
          const response = await axios(cUrl)
          return response.data
        }))
        this.setState({
          characters:res
        })
    }
    catch (error) {
      this.setState({
        errorMessage: error.message,
        hasLoaded:false,
        hasError: true,
      });
    }
  }
  render() {
    const { characters, episode,hasError,hasLoaded} = this.state;
    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-12">
              <h1 className="h3">{episode.name}</h1>
            </div>
            <div className="col col-12">
              <hr />
            </div>
            <div className="col col-12">
              <div className="d-flex">
                <p className="mb-0 mr-2">{episode.episode}</p>
                <p className="mb-0 mr-2">|</p>
                <p className="mb-0">{episode.air_date}</p>
              </div>
              <div className="col col-12">
                <hr />
              </div>
            </div>
            {characters.length > 0 &&
              characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  image={character.image}
                  species={character.species}
                  status={character.status}
                  origin={character.origin}
                  location={character.location}
                />
              ))}
          </section>
        )}

        {!hasLoaded && (
          <section className="row">
            <div className="col col-12">
              <h1 className="h3">Loading data...</h1>
            </div>
          </section>
        )}
        {hasError && (
          <section className="row">
            <div className="col col-12">
              <h1>Something went wrong...</h1>
              <p>{errorMessage}</p>
            </div>
          </section>
        )}
      </Layout>
    );
  }
}

export default Episode;
