import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import { getLocation, getDataList } from "../../api/api";

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
    this.loadLocation();
  }

  async loadLocation() {
    const id = this.props.match.params.id;

    try {
      const location = await getLocation(id);
      const residents = await getDataList(location.residents);

      this.setState({
        location,
        residents,
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
      location,
      residents,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          {hasError && (
            <div className="col col-12">
              <h1>Character could not be loaded...</h1>
              <p>{errorMessage}</p>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <h1>Loading character...</h1>
            </div>
          )}
          {location && (
            <div className="col col-12">
              <h1>🌌{location.name}</h1>
              <div className="d-flex">
                <div className="me-2">
                  <h3 className="CharacterCard__name h6 mb-0 font-weight-bold">
                    TYPE:
                  </h3>
                  <p>{location.type}</p>
                </div>
                <div>
                  <h3 className="CharacterCard__name h6 mb-0 font-weight-bold">
                    DIMENSION:
                  </h3>
                  <p>{location.dimension}</p>
                </div>
              </div>
            </div>
          )}
        </section>
        <section className="row">
          <div className="col col-12">
            <hr />
          </div>
          <div className="col col-12">
            <h4>📺Residents:</h4>
          </div>
          <div className="col col-12">
            <hr/>
          </div>
          {residents.length > 0 &&
            residents.map((resident) => (
              <CharacterCard
                key={resident.id}
                id={resident.id}
                image={resident.image}
                name={resident.name}
                species={resident.species}
                status={resident.status}
                origin={resident.origin.name}
                location={resident.location}
              />
            ))}
        </section>
      </Layout>
    );
  }
}

export default Location;
