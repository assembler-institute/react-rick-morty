import React, { Component } from "react";

import Layout from "../../components/Layout";

import { getCharacters, getUrl } from "../../api";

import "../../components/CharacterCard/CharacterCard.scss";

import EpisodeCard from "../../components/EpisodeCard";

import * as routes from "../../constants/routes";

function makePromises(urls = []) {
  const myArray = urls.map((url) => getUrl(url));
  // console.log(myArray);
  return myArray;
}

class CharacterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
      name: "",
      image: "",
      species: "",
      status: "",
      origin: "",
      location: "",
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
    this.loadCharacters = this.loadCharacters.bind(this);
  }

  componentDidMount() {
    // console.log(this);

    const { match } = this.props;
    const { characterId } = match.params;

    // console.log(characterId);
    this.loadCharacters(characterId);
  }

  async loadCharacters(characterId) {
    // console.log(this);
    try {
      const { data } = await getCharacters(characterId);

      // eslint-disable-next-line compat/compat
      const characterEpisodes = await Promise.all(
        makePromises(data.episode),
      );

      const episodesFromCharacter = characterEpisodes.map((character) => character.data);

      console.log(episodesFromCharacter);

      this.setState({
        episodes: episodesFromCharacter,
        name: data.name,
        image: data.image,
        species: data.species,
        status: data.status,
        origin: data.origin.name,
        location: data.location.name,
        hasLoaded: true,
        hasError: false,
        errorMessage: null,

      });

      console.log(data);
    } catch (error) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.message,
      });
    }
  }

  render() {
    const {
      episodes,
      name,
      image,
      species,
      status,
      origin,
      location,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <Layout>
        <section className="container">
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
            <section className="row row-12 row-sm-6 row-xl-3 CharacterCard">
              <div className="col col-12 col-sm-6 col-xl-3 CharacterCard">
                <img className="CharacterCard__img" src={image} alt="" />
              </div>
              <div className="col col-12 col-sm-6 col-xl-3 CharacterCard">
                <h3 className="CharacterCard__name h4">{name}</h3>
                <hr />
                <div>
                  <h6>CHARACTER</h6>
                  <p className="CharacterCard__meta-item"> {species} | {status}</p>
                </div>
                <div className="CharacterCard__meta">
                  <div className="CharacterCard">
                    <h6>ORIGIN</h6>
                    <p className="CharacterCard__meta-item">{origin}</p>
                  </div>
                  <div className="CharacterCard">
                    <h6>LOCATION</h6>
                    <p className="CharacterCard__meta-item">{location}</p>
                  </div>
                </div>
              </div>
            </section>
            <hr />
            <section className="row">
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
            </section>
          </section>
      </Layout>
    );
  }
}
export default CharacterPage;
