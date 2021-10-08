/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

export default class location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      dimension: "",
      residentList: [],
    };
  }

  componentDidMount() {
    this.loadLocations();
  }

  async loadLocations() {
    console.log(this.props.match.params.locationId);
    const locationId = this.props.match.params.locationId;
    const URL_LOCATION = `https://rickandmortyapi.com/api/location/${locationId}`;
    console.log(URL_LOCATION);
    const llamada = await axios.get(URL_LOCATION);
    console.log(llamada.data);
    const resum = llamada.data;
    this.setState({
      name: resum.name,
      type: resum.type,
      dimension: resum.dimension,
    });

    // console.log(llamada.data.residents);
    const locationsURL = llamada.data.residents;
    const locationsCharacters = await axios.all(
      locationsURL.map((locations) => axios.get(locations)),
    );
    // console.log(locationsCharacters.data);
    this.setState({
      residentList: locationsCharacters,
    });
  }

  render() {
    const { name, type, dimension, residentList } = this.state;
    return (
      <Layout>
        <div>
          <h1>Location</h1>
          <h4>
            <strong>Name:</strong> {name}
          </h4>
          <h4>
            <strong>Type: </strong>
            {type}
          </h4>
          <h4>
            <strong>Dimension: </strong>
            {dimension}
          </h4>
        </div>
        <div>
          {residentList.map((resident) => (
            <CharacterCard
              key={resident.data.id}
              characterId={resident.data.id}
              name={resident.data.name}
              image={resident.data.image}
              species={resident.data.species}
              status={resident.data.status}
              origin={resident.data.origin}
              location={resident.data.location.url}
            />
          ))}
        </div>
      </Layout>
    );
  }
}
