import React, { Component } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import { getLocation } from "../../Api";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
    this.loadLocation = this.loadLocation.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { locationId } = match.params;

    this.loadLocation(locationId);
  }

  async loadLocation(locationId) {
    try {
      const { data } = await getLocation(locationId);

      const promises = data.residents.map((resident) => axios.get(resident));

      const residentsResponse = await Promise.all(promises);

      const residents = residentsResponse.map((resident) => resident.data);

      this.setState({
        hasLoaded: true,
        location: data,
        residents: residents,
      });
    } catch (e) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: e.message,
      });
    }
  }

  render() {
    const { location, residents, hasLoaded, hasError, errorMessage } = this.state;
    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p>Location not loaded...</p>
            </div>
          )}
        {hasLoaded && !hasError && (
            <>
            <div className="col col-12">
              <h5>
                Location:
                <span className="text-danger">{` ${location.name}`}</span>
              </h5>
              <hr />
              <h4>Residents</h4>
              <hr />
            </div>
              { residents.map((resident) => (
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
            </>
        )}
          

          {hasError && (
            <div className="col col-12">
              <p>Location error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          
          
        </section>
      </Layout>
    )}}

export default Location;