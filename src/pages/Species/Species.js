import React, { Component } from "react";
import { getCharacterSpecies } from "../../api";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Species extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
    this.loadSpecies = this.loadSpecies.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.clear();
    const { location } = this.props;
    // eslint-disable-next-line compat/compat
    const querySearch = new URLSearchParams(location.search);
    const species = querySearch.get("species");
    this.loadSpecies(species);
  }

  async loadSpecies(specie) {
    try {
      const { data } = await getCharacterSpecies(specie);
      const charactersSpecies = data.results;

      this.setState({
        species: specie,
        hasLoaded: true,
        characters: charactersSpecies,
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
      species,
      characters,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p>Species not loaded</p>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Something went wrong</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {hasLoaded && !hasError && (
            <div className="top-part mb-4 col col-12">
              <h1>{species.charAt(0).toUpperCase() + species.slice(1)}s</h1>
            </div>
          )}
          <div className="col col-12 my-0">
            <hr />
          </div>
          {characters.length > 0 &&
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

export default Species;
