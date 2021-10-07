import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import { API, EPISODE } from "../../constants/routes";

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
    this.loadCharacters();
  }

  loadCharacters() {
    const { match } = this.props;
    const { episodeId } = match.params;
    const charactersUrl = `${API}${EPISODE}/${episodeId}`;
    axios
      .get(charactersUrl)
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

        axios
          .all(
            characterUris.map((char) => {
              return axios.get(char);
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
            this.setState({
              hasLoaded: false,
              hasError: true,
              errorMessage: error,
            });
          });
      })
      .catch((error) => {
        this.setState({
          hasLoaded: false,
          hasError: true,
          errorMessage: error,
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
          <section className="row">
            {hasError && <div>{errorMessage}</div>}
            {hasLoaded && (
              <div className="col col-12 p-0">
                <div className="col col-12 col-sm-6 col-xl-4 EpisodeCard">
                  <h3 className="Episode__name h5">{episode.name}</h3>
                  <div className="Episode__meta">
                    <p className="Episode__meta-item">{episode.episode}</p>
                    <p className="Episode__meta-item">|</p>
                    <p className="Episode__meta-item">{episode.air_date}</p>
                  </div>
                </div>
              </div>
            )}
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
