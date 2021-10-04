import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import { fetchApi } from "../../utils/fetchApi";

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
  }

  componentDidMount() {
    this.getCharacters();
  }

  getCharacters() {
    const { match } = this.props;
    const { episodeId } = match.params;
    axios
      .get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then((apiEpisode) => {
        this.setState({
          episode: {
            id: apiEpisode.data.id,
            name: apiEpisode.data.name,
            episode: apiEpisode.data.episode,
            air_date: apiEpisode.data.air_date,
          },
        });

        const characterUris = apiEpisode.data.characters;
        console.log(characterUris);

        axios
          .all(
            characterUris.map((char) => {
              return fetchApi(char);
            }),
          )
          .then((data) => {
            const charactersArr = data.map((characterData) => {
              return characterData.data;
            });
            this.setState({
              characters: charactersArr,
              hasLoaded: true,
              hasError: false,
            });
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              hasLoaded: false,
              hasError: true,
              errorMessage: "Error loading characters",
            });
          });
      });
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
      <>
        <Layout>
          {hasError && <div>ERROR</div>}
          <section className="row">
            <div className="col col-12">
              {hasLoaded && <h3>{episode.name}</h3>}

              {hasLoaded && (
                <p>
                  {episode.episode} | {episode.air_date}
                </p>
              )}
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
      </>
    );
  }
}

export default Episode;
