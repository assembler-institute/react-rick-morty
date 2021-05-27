import { React, Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import { LOCATION, URL } from "../../constants/routes";

const axios = require("axios");

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      type: null,
      dimension: null,
      residents: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    await this.loadLocation();
  }

  componentDidUpdate(prevProps) {
    const { match: prevMatch } = prevProps;
    const { locationId: prevLocationId } = prevMatch.params;

    const { match } = this.props;
    const { locationId } = match.params;

    if (prevLocationId !== locationId) {
      this.loadLocation();
    }
  }

  async loadLocation() {
    try {
      const { location } = this.props;
      const id = location.pathname.replace("/location/", "");
      const response = await axios.get(`${URL}${LOCATION}/${id}`);
      const data = response.data;

      const { name, type, dimension, residents } = data;
      const locResidents = residents.map((resident) => axios.get(resident));
      const residentsArr = [];
      // eslint-disable-next-line compat/compat
      await Promise.all(locResidents).then((result) =>
        result.forEach((e) => residentsArr.push(e.data)),
      );

      this.setState({
        name: name,
        type: type,
        dimension: dimension,
        residents: residentsArr,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        hasError: true,
      });
    }
  }

  render() {
    const {
      hasLoaded,
      hasError,
      errorMessage,
      name,
      type,
      dimension,
      residents,
    } = this.state;
    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-12">
              <h1>{name}</h1>
              <p>
                {type} / {dimension}
              </p>
              {residents.map((character) => (
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  image={character.image}
                  species={character.species}
                  status={character.status}
                  origin={character.origin}
                  location={character.location}
                />
              ))}
            </div>
          </section>
        )}

        {hasError && (
          <div className="col col-12">
            <h1>Something went wrong...</h1>
            <h2 className="errorMessage">{errorMessage}</h2>
          </div>
        )}
      </Layout>
    );
  }
}

export default Location;
