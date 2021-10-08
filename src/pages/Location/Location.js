import React from "react";
import CharacterCard from "../../components/CharacterCard";
import Layout from "../../components/Layout";

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {},
      residents: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/location/${params.locationId}`,
      );
      const json = await response.json();
      console.log(json);

      this.setState({
        location: json,
      });

      let residents = await Promise.all(
        json.residents.map(async (url) => {
          const response = await fetch(url);
          return response.json();
        }),
      );

      this.setState({
        residents: residents,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    /* console.log(prevProps, this.props); */
  }
  render() {
    const { hasError, hasLoaded, residents, location } = this.state;
    return (
      <Layout>
        {!hasError && hasLoaded && (
          <section className="row">
            <div className="col col-12">
              <h1>{location.name}</h1>
              <hr />
            </div>
            <div className="col col-12">
              <h6>TYPE</h6>
              <span className="d-block pb-3">{location.type}</span>
              <h6>DIMENSION</h6>
              <span>{location.dimension}</span>
            </div>
            <div className="col col-12">
              <hr />
              <h6 className="pb-3">RESIDENTS</h6>
            </div>
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
          </section>
        )}
      </Layout>
    );
  }
}

export default Location;
