import React, { Component } from "react";
import axios from "axios";
import * as Routes from "../../constants/routes";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: [],
      residents: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    await this.loadLocation();
  }

  async loadLocation() {
    const { match } = this.props;
    const num = match.params.locationId;
    try {
      const res = await axios.get(`${Routes.API}${Routes.LOCATION}/${num}`);
      const arr = await axios.all(res.data.residents.map((e) => axios.get(e)));
      const arr2 = arr.map((e) => e.data);

      this.setState({
        location: res.data,
        hasLoaded: true,
        residents: arr2,
      });
    } catch (e) {
      this.setState({
        hasError: true,
        errorMessage: "Error, page not loaded",
      });
    }
  }

  render() {
    const {
      location,
      hasLoaded,
      hasError,
      errorMessage,
      residents,
    } = this.state;
    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <h1>{location.name}</h1>
            <hr />
            <div className="row">
              {residents.map((character) => (
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  image={character.image}
                  species={character.species}
                  status={character.status}
                  origin={character.origin}
                  location={character.location.name}
                  locationUrl={character.location.url}
                />
              ))}
            </div>
          </section>
        )}
        {hasError && (
          <div className="col col-12">
            <h1>{errorMessage}</h1>
          </div>
        )}
      </Layout>
    );
  }
}

export default Location;
