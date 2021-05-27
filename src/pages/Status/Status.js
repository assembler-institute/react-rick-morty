import React, { Component } from "react";
import { getCharacterStatus } from "../../api";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
    this.loadStatus = this.loadStatus.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.clear();
    const { location } = this.props;
    // eslint-disable-next-line compat/compat
    const querySearch = new URLSearchParams(location.search);
    const status = querySearch.get("status");
    this.loadStatus(status);
  }

  async loadStatus(stat) {
    try {
      const { data } = await getCharacterStatus(stat);
      const charactersStatus = data.results;

      this.setState({
        status: stat,
        hasLoaded: true,
        characters: charactersStatus,
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
      status,
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
              <p>Status not loaded</p>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Something went wrong</p>
              <p>{errorMessage}</p>
            </div>
          )}
          {hasLoaded && !hasError && (
            <div className="top-part col col-12">
              <h1>
                {status.charAt(0).toUpperCase() + status.slice(1)} characters
              </h1>
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

export default Status;
