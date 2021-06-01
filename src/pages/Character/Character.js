import React, { Component } from "react";
import axios from "axios";
import { getCharacter } from "../../api";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      species: "",
      status: "",
      originName: "",
      locationName: "",
      image: "",
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadCharacter = this.loadCharacter.bind(this);
  }

  componentDidMount() {
    // console.log(this.props);
    const { match } = this.props;
    const { characterId } = match.params;
    // console.log(characterId);
    this.loadCharacter(characterId);
  }

  async loadCharacter(characterId) {
    try {
      const { data } = await getCharacter(characterId);

      const promises = data.episode.map((episode) => axios.get(episode));
      // eslint-disable-next-line compat/compat
      const episodesResponse = await Promise.all(promises);

      const episodes = episodesResponse.map((episode) => episode.data);
      // console.log({ data });
      // console.log({ episodesResponse });
      // console.log({ episodes });
      this.setState({
        name: data.name,
        species: data.species,
        status: data.status,
        originName: data.origin.name,
        locationName: data.location.name,
        image: data.image,
        episodes: episodes,
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
    const {
      name,
      species,
      status,
      originName,
      locationName,
      image,
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        {!hasLoaded && (
          <div className="col col-12">
            <h1>Loading character...</h1>
          </div>
        )}
        {hasError && (
          <div className="col col-12">
            <h1>Unable to load character. Something went wrong!</h1>
            <p>{errorMessage}</p>
          </div>
        )}
        {hasLoaded && !hasError && (
          <div>
            <section className="row">
              <div className="col col-4">
                <img className="CharacterCard__img" src={image} alt="" />
              </div>
              <div className="col col-8">
                <h1>{name}</h1>
                <div className="col col-12 p-0">
                  <hr />
                </div>
                <div className="col col-12 p-0">
                  <div className="CharacterCard__meta col col-12 d-flex flex-column p-0">
                    <h5>CHARACTER</h5>
                    <div className="d-flex">
                      <p className="CharacterCard__meta-item">{species}</p>
                      <p className="CharacterCard__meta-item">|</p>
                      <p className="CharacterCard__meta-item">{status}</p>
                    </div>
                  </div>
                  <div className="CharacterCard__meta col col-12 p-0">
                    <div className="col col-4 p-0">
                      <h5>ORIGIN</h5>
                      <p className="CharacterCard__meta-item">{originName}</p>
                    </div>
                    <div className="col col-4 p-0">
                      <h5>LOCATION</h5>
                      <p className="CharacterCard__meta-item">{locationName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="col col-12 p-0">
              <hr />
            </div>
            <section className="row">
              <div className="col col-12 mb-4">
                <h5>Episodes</h5>
              </div>
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
          </div>
        )}
      </Layout>
      //   <></>
    );
  }
}

export default Character;
