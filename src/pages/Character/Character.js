import React, { Component } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { getCharacter, getEpisodes } from "../../api";

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      image: "",
      species: "",
      status: "",
      origin: "",
      location: "",
      episodes: [],
      hasLoaded: false,
      hasError: null,
    };
    this.loadCharacter = this.loadCharacter.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { characterId } = match.params;

    this.loadCharacter(characterId);
  }

  async loadCharacter(characterId) {
    const { data } = await getCharacter(characterId);
    const promises = data.episode.map((episode) => axios.get(episode));

    const episodeResponse = await Promise.all(promises);
    const episodes = episodeResponse.map((episode) => episode.data);
    this.setState((prevState) => ({
      ...prevState,
      name: data.name,
      image: data.image,
      species: data.species,
      status: data.status,
      origin: data.origin.name,
      location: data.location.name,
      episodes: episodes,
      hasLoaded: true,
      hasError: null,
    }));
  }

  render() {
    const {
      hasLoaded,
      hasError,
      image,
      episodes,
      name,
      species,
      origin,
      location,
    } = this.state;
    return (
      <div className="container">
        {hasLoaded && (
          <div className="container">
            <div className="row">
              <div className="col col-4">
                <img src={image} />
              </div>
              <div className="col col-6">
                <h1>{name}</h1>
                <p>Character</p>
                <span>{species}</span>
                <p>Origin</p>
                <span>{origin}</span>
                <p>Location</p>
                <span>{location}</span>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col col-12">
                {episodes.length > 0 &&
                  episodes.map((episode) => (
                    <EpisodeCard
                      key={episode.id}
                      id={episode.id}
                      name={episode.name}
                      airDate={episode.air_date}
                      episode={episode.episode}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
        {hasError && <p>Hay un error</p>}
      </div>
    );
  }
}

export default Character;
