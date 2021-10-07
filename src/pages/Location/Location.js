import axios from "axios";
import React, { Component } from "react";
import CharacterCard from "../../components/CharacterCard";
import LocationCard from "../../components/LocationCard";
import { axiosId, urlArr } from "../../utils/axiosRequest";
import Layout from "../../components/Layout";

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      residents: [],
      hasLoaded: false,
      hasError: false,
    };
    this.loadLocation = this.loadLocation.bind(this);
  }

  async componentDidMount() {
    this.loadLocation();
  }

  async loadLocation() {
    const locationId = this.props.match.params.id;
    console.log(locationId);

    await axiosId(urlArr[1], locationId).then((res) => {
      const locationObj = res.data;
      this.setState({
        location: locationObj,
      });
      axios
        .all(locationObj.residents.map((resident) => axios.get(resident)))
        .then((res) => {
          let locationData = res.map((loc) => loc.data);
          console.log(locationData);
          this.setState({
            residents: locationData,
            hasLoaded: true,
            hasError: false,
          });
        });
    });
  }

  render() {
    const { hasLoaded, hasError, residents, location } = this.state;
    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-12">
              <h2>Residents!!!</h2>
              <LocationCard
                name={location.name}
                type={location.type}
                dimension={location.dimension}
              />
              <div>
                {residents.map((resident) => (
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
              </div>
            </div>
          </section>
        )}
      </Layout>
    );
  }
}
