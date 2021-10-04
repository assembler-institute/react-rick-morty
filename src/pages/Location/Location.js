import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import * as api from "../../constants/api";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      residents: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.loadLocation(id);
  }

  async loadLocation(id) {
    const response = await axios.get(`${api.LOCATION_URL}/${id}`);
    const locationResponse = response.data;
    const residentUrls = response.data.residents;
    const requests = residentUrls.map((residentUrl) =>
      axios.get(residentUrl).catch((err) => null),
    );
    try {
      const residents = await axios.all(requests);
      this.setState({
        location: locationResponse,
        residents: residents,
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
      location,
      residents,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h3>{location.name}</h3>
              <h5>{location.type}</h5>
              <h5>{location.dimension}</h5>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1>{errorMessage}</h1>
            </div>
          )}
          <div className="col col-12">
            {residents.map((resident) => (
              <CharacterCard
                key={resident.data.id}
                id={resident.data.id}
                name={resident.data.name}
                image={resident.data.image}
                species={resident.data.species}
                status={resident.data.status}
                origin={resident.data.origin}
                location={resident.data.location}
              />
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Location;
