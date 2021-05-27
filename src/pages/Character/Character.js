import { React, Component } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { CHARACTER, URL, LOCATION } from "../../constants/routes";

import "./Character.scss";

const axios = require("axios");

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      img: null,
      species: null,
      status: null,
      origin: {},
      originId: null,
      location: {},
      locationId: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadCharacter = this.loadCharacter.bind(this);
    this.locationIds = this.locationIds.bind(this);
  }

  async componentDidMount() {
    await this.loadCharacter();
  }

  locationIds() {
    const { origin, location } = this.state;
    const originId = origin.url.replace(
      "https://rickandmortyapi.com/api/location/",
      "",
    );
    const locationId = location.url.replace(
      "https://rickandmortyapi.com/api/location/",
      "",
    );
    this.setState({
      originId: originId,
      locationId: locationId,
    });
  }

  async loadCharacter() {
    try {
      const { location } = this.props;
      const id = location.pathname.replace("/character/", "");
      const response = await axios.get(`${URL}${CHARACTER}/${id}`);
      const data = response.data;

      const { episode } = data;
      const episodes = episode.map((ep) => axios.get(ep));
      const episodesArr = [];
      // eslint-disable-next-line compat/compat
      await Promise.all(episodes).then((result) =>
        result.forEach((e) => episodesArr.push(e.data)),
      );

      this.setState({
        name: data.name,
        img: data.image,
        species: data.species,
        status: data.status,
        origin: data.origin,
        location: data.location,
        episodes: episodesArr,
        hasLoaded: true,
      });

      this.locationIds();
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        hasError: true,
      });
    }
  }

  render() {
    const {
      name,
      img,
      episodes,
      species,
      origin,
      originId,
      location,
      locationId,
      status,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <>
        <Layout>
          {hasLoaded && !hasError && (
            <>
              <section className="characterProfile">
                <img src={img} alt={name} />

                <div className="characterInfo">
                  <h1>{name}</h1>
                  <hr />
                  <h3>CHARACTER</h3>
                  <p>
                    {species} | {status}
                  </p>
                  <hr />
                  <div className="characterOrigin">
                    <h3>ORIGIN</h3>
                    <Link to={`${LOCATION}/${originId}`}>{origin.name}</Link>
                  </div>
                  <div className="characterLocation">
                    <h3>LOCATION</h3>
                    <Link to={`${LOCATION}/${locationId}`}>
                      {location.name}
                    </Link>
                  </div>
                </div>
              </section>

              <section className="row episodes">
                <h2>Episodes</h2>
                {episodes.map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    id={episode.id}
                    name={episode.name}
                    airDate={episode.air_date}
                    episode={episode.episode}
                  />
                ))}
              </section>
            </>
          )}

          {hasError && (
            <div className="col col-12">
              <h1>Something went wrong...</h1>
              <h2 className="errorMessage">{errorMessage}</h2>
            </div>
          )}
        </Layout>
      </>
    );
  }
}
export default Character;
