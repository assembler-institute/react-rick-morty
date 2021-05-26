import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import {getEpisode, getUrl} from "../../api";

function makePromises (urls = []) {
  return urls.map((url) => getUrl(url));
}

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
    console.log(this.props);
    // If the check previus console.log we will see that on match property we have the ID information for the episode
    const { match } = this.props;
    const { episodeId } = match.params;

    this.loadEpisode(episodeId);
  }

  async loadEpisode(episodeId) {
    try {
      // data is the information of the hole episode
      const { data } = await getEpisode(episodeId);
      // charactersResponse is an array with all characters
      const charactersResponse = await Promise.all(makePromises(data.characters));
      // Because of the structure of the charactersResponse:
      const characters = charactersResponse.map((character) => character.data);
      console.log(data);
      console.log(charactersResponse);
      console.log(characters);

      this.setState ({
        hasLoaded: true,
        hasError: false,
        episode: data,
        characters: characters,
      });
    } catch (error) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.message
      });
    }
  }

  render() {
    const {
      episode,
      characters,
      hasLoaded,
      hasError,
      errorMessage
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p>Episode loading...</p>
            </div>
          )}
          {hasLoaded && (
            <div className="col col-12">
              <p>Episode loaded!</p>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p>Episode error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
          <hr />
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

export default Episode;
