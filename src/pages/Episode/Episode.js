import React, { Component } from "react";
import axios from "axios";
import { getEpisode } from "../../api";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadEpisode = this.loadEpisode.bind(this);
  }

  componentDidMount() {
    // console.log(this.props);
    const { match } = this.props;
    const { episodeId } = match.params;
    console.log(episodeId);
    this.loadEpisode(episodeId);
  }

  async loadEpisode(episodeId) {
    try {
      const { data } = await getEpisode(episodeId);
      const promises = data.characters.map((character) => axios.get(character));
      // eslint-disable-next-line compat/compat
      const charactersResponse = await Promise.all(promises);

      const characters = charactersResponse.map((character) => character.data);
      // console.log({ data });
      // console.log({ charactersResponse });
      // console.log({ characters });
      this.setState({
        episode: data,
        characters: characters,
        hasLoaded: true,
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
      episode,
      characters,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        {!hasLoaded && (
          <div className="col col-12">
            <h1>Loading episode...</h1>
          </div>
        )}
        {hasError && (
          <div className="col col-12">
            <h1>Unable to load episode. Something went wrong!</h1>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* <div className="col col-12">
            <hr />
            {JSON.stringify(episode, null, 2)}
            <hr />
          </div> */}
        <section className="row">
          {hasLoaded &&
            !hasError &&
            characters.length > 0 &&
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

export default Episode;
