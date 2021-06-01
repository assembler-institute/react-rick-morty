import React, { Component } from "react";
import axios from "axios";
import { getLocation } from "../../api";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      type: "",
      dimension: "",
      residents: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadLocation = this.loadLocation.bind(this);
  }

  componentDidMount() {
    // console.log(this.props);
    const { match } = this.props;
    const { locationId } = match.params;
    // console.log(characterId);
    this.loadLocation(locationId);
  }

  async loadLocation(locationId) {
    try {
      const { data } = await getLocation(locationId);

      const promises = data.residents.map((resident) => axios.get(resident));
      // eslint-disable-next-line compat/compat
      const residentsResponse = await Promise.all(promises);

      const residents = residentsResponse.map((resident) => resident.data);

      console.log({ data });
      console.log({ residentsResponse });
      console.log({ residents });

      this.setState({
        name: data.name,
        type: data.type,
        dimension: data.dimension,
        residents: residents,
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
      type,
      dimension,
      residents,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        {!hasLoaded && (
          <div className="col col-12">
            <h1>Loading location...</h1>
          </div>
        )}
        {hasError && (
          <div className="col col-12">
            <h1>Unable to load location. Something went wrong!</h1>
            <p>{errorMessage}</p>
          </div>
        )}
        {hasLoaded && !hasError && (
          <div>
            <section>
              <div className="col col-12 p-0">
                <hr />
              </div>
              <div className="row d-flex justify-content-center">
                <h1 className="col col-6 text-center">{name}</h1>
              </div>
              <div className="col col-12 p-0">
                <hr />
              </div>
              <div className="row d-flex justify-content-between">
                <div className="col col-4">
                  <div className="col col-9 text-center">
                    <h5>TYPE</h5>
                    <p>{type}</p>
                  </div>
                </div>
                <div className="col col-4">
                  <div className="col col-9 text-center">
                    <h5>DIMENSION</h5>
                    <p>{dimension}</p>
                  </div>
                </div>
              </div>
              <div className="col col-12 p-0">
                <hr />
              </div>
            </section>
            <section className="row">
              <div className="col col-12 mb-4">
                <h5>Residents</h5>
              </div>
              {residents.length > 0 &&
                residents.map((resident) => (
                  <CharacterCard
                    key={resident.id}
                    id={resident.id}
                    name={resident.name}
                    image={resident.image}
                    species={resident.species}
                    status={resident.status}
                    origin={resident.origin}
                    location={resident.location}
                  />
                ))}
            </section>
            {/* <section className="row">
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
            </section> */}
          </div>
        )}
      </Layout>
      //   <></>
    );
  }
}

export default Location;
