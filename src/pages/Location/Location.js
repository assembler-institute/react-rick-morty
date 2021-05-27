import React, { Component } from "react";
import axios from "axios";
import { getLocation } from "../../api";
import CharacterCard from "../../components/CharacterCard";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      type: "",
      dimension: "",
      residents: [],
      hasLoaded: false,
      hasError: null,
    };
    this.loadLocation = this.loadLocation.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { locaId } = match.params;
    console.log(locaId);
    this.loadLocation(locaId);
  }

  async loadLocation(locationId) {
    const { data } = await getLocation(locationId);
    const promises = data.residents.map((resident) => axios.get(resident));

    const locationResponse = await Promise.all(promises);
    const locations = locationResponse.map((location) => location.data);
    this.setState((prevState) => ({
      ...prevState,
      locations: locations,
      hasLoaded: true,
      hasError: null,
      name: data.name,
      type: data.type,
      dimension: data.dimension,
      residents: locations,
    }));
  }

  render() {
    const {
      hasLoaded,
      hasError,
      name,
      type,
      dimension,
      residents,
    } = this.state;
    return (
      <div className="container">
        {hasLoaded && (
          <div className="container">
            <h5>Name</h5>
            <p>{name}</p>
            <hr />
            <h5>Type</h5>
            <p>{type}</p>
            <hr />
            <h5>Dimension</h5>
            <p>{dimension}</p>
            <hr />
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
          </div>
        )}

        {hasError && <p>Hay un error</p>}
      </div>
    );
  }
}

export default Location;
