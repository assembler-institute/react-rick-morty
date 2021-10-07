import React, { Component } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      dimension: null,
      residents: null,
      population: null,
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.getLocationDetail();
  }

  async getLocationDetail() {
    const { match } = this.props;
    const { locationId } = match.params;

    try {
      let location = await axios.get(
        `https://rickandmortyapi.com/api/location/${locationId}`,
      );

      const residents = location.data.residents.map((resident) =>
        axios.get(resident),
      );

      const response = await Promise.all(residents);
      const people = [];

      response.map((person) => {
        people.push(person.data);
      });

      this.setState({
        name: location.data.name,
        dimension: location.data.dimension,
        residents: people,
        population: location.data.residents.length,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        errorMessage: error,
      });
    }
  }
  render() {
    const {
      name,
      dimension,
      residents,
      population,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        {hasError && (
          <section>
            <p className="text-danger">Location Not Found!</p>
          </section>
        )}

        {!hasError && (
          <main>
            {!hasLoaded && !hasError && (
              <>
                <section className="row">
                  <div className="col col-12">
                    <p>Loading Location...</p>
                  </div>
                  <div className="col col-12">
                    <hr />
                  </div>
                </section>
              </>
            )}

            {hasLoaded && !hasError && (
              <>
                <section>
                  <div className="col col-12">
                    <h5>
                      Location:
                      <span className="text-warning"> {name}</span>
                    </h5>
                    <h5>
                      Dimension:
                      <span className="text-success"> {dimension}</span>
                    </h5>
                    <h5>
                      Population:
                      <span className="text-info"> {population}</span>
                    </h5>
                  </div>
                  <div className="col col-12">
                    <hr />
                  </div>
                </section>

                <section className="row">
                  <div className="col col-12">
                    <h5>Residents:</h5>
                  </div>{" "}
                  <div className="row col-12">
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
              </>
            )}
          </main>
        )}
      </Layout>
    );
  }
}

export default Location;
