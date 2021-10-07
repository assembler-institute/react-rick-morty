import axios from "axios";
import React, { Component } from "react";
import CharacterCard from "../../components/CharacterCard";
import Layout from "../../components/Layout";
import { API, LOCATION } from "../../constants/routes";

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      residents: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.loadLocationResidents();
  }

  loadLocationResidents() {
    const { match } = this.props;
    const locationId = match.params.locationId;
    axios.get(`${API}${LOCATION}/${locationId}`).then((location) => {
      this.setState({ location: location.data });
      const residentUrls = location.data.residents;
      axios
        .all(
          residentUrls.map((residentUrl) => {
            return axios.get(residentUrl);
          }),
        )
        .then((res) => {
          const residents = res.map((resident) => {
            return resident.data;
          });
          this.setState({ residents: residents, isLoaded: true });
        });
    });
  }

  render() {
    const { residents, isLoaded, location } = this.state;
    return (
      <>
        <Layout>
          <section className="row">
            {isLoaded && (
              <div className="col col-12 p-0">
                <div className="col col-12 col-sm-6 col-xl-4 EpisodeCard">
                  <h3 className="Episode__name h5">{location.name}</h3>
                  <div className="Episode__meta">
                    <p className="Episode__meta-item">{location.type}</p>
                    <p className="Episode__meta-item">|</p>
                    <p className="Episode__meta-item">{location.dimension}</p>
                  </div>
                </div>
              </div>
            )}
            {isLoaded &&
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
        </Layout>
      </>
    );
  }
}
