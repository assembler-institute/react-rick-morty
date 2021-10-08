// import axios from "axios";
import React from "react";
import * as routes from "../../constants/routes";
import axios from "axios";

import Layout from "../../components/Layout";
import LocationCard from "../../components/LocationCard";
import CharacterCard from "../../components/CharacterCard";
import ButtonGoBack from "../../components/ButtonGoBack";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      characters: [],
      hasLoaded: false,
    };
  }
  async componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    const locationId = this.props.match.params.id;

    axios
      .get(`https://rickandmortyapi.com/api${routes.LOCATION}/${locationId}`)
      .then((result) => {
        const location = result.data;
        this.setState({ location: location });
        axios
          .all(location.residents.map((i) => axios.get(i)))
          .then((request) => {
            const result = request.map((i) => i.data);
            this.setState({
              characters: result,
              hasLoaded: true,
            });
          });
      });
  }
  render() {
    const { location, characters, hasLoaded } = this.state;
    const { history } = this.props;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <ButtonGoBack path={history} />
          </div>
          <div className="col col-12">
            <h5>Location</h5>
          </div>
          <LocationCard
            name={location.name}
            type={location.type}
            dimension={location.dimension}
          />
          <div className="col col-12">
            <h5>Residents</h5>
          </div>
          {hasLoaded &&
            characters.map((character) => (
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
        </section>
      </Layout>
    );
  }
}

export default Location;
