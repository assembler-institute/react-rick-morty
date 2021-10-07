/* eslint-disable no-console */
import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      residents: [],
      dimension: "",
      name: "",
      type: "",
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.loadLocation();
  }

  async loadLocation() {
    console.log(this.props);
    // eslint-disable-next-line react/destructuring-assignment
    const id = this.props.match.params.locationId;

    const baseURL = `https://rickandmortyapi.com/api/location/${id}`;

    try {
      const APIcall = await axios.get(baseURL);
      console.log(APIcall);
      const residentsArray = APIcall.data.residents;
      const res = await axios.all(
        residentsArray.map((resURL) => axios.get(resURL)),
      );

      this.setState({
        dimension: APIcall.data.dimension,
        residents: res,
        name: APIcall.data.name,
        type: APIcall.data.type,
        hasLoaded: true,
      });
    } catch (err) {
      this.setState({
        hasError: false,
        errorMessage: "Location not found!!",
      });
    }
  }

  render() {
    const {
      hasLoaded,
      hasError,
      errorMessage,
      residents,
      name,
      dimension,
      type,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            {hasLoaded && !hasError ? (
              <>
                <h3 className="Episode__name h5">{name}</h3>
                <div className="Episode__meta">
                  <p className="Episode__meta-item">{dimension}</p>
                  <p className="Episode__meta-item">|</p>
                  <p className="Episode__meta-item">{type}</p>
                </div>
              </>
            ) : (
              <h1>{errorMessage}</h1>
            )}
          </div>
          <div className="col col-12">
            <hr />
          </div>

          {residents.map((character) => (
            <CharacterCard
              key={character.data.id}
              id={character.data.id}
              name={character.data.name}
              image={character.data.image}
              species={character.data.species}
              status={character.data.status}
              origin={character.data.origin}
              location={character.data.location}
            />
          ))}

          <div className="col col-12">
            <hr />
          </div>
        </section>
      </Layout>
    );
  }
}
export default Location;
