import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import { FaceRetouchingNatural } from "@mui/icons-material";

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

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${params.episodeId}`,
      );
      const json = await response.json();

      this.setState({
        episode: json,
      });

      let characters = await Promise.all(
        json.characters.map(async (url) => {
          const response = await fetch(url);
          return response.json();
        }),
      );

      this.setState({
        characters: characters,
        hasLoaded: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { characters, episode } = this.state;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <h1>{episode && episode.name}</h1>
            <hr />
          </div>
          <div className="col col-12">
            <h6>
              {episode && episode.episode} | {episode && episode.air_date}
            </h6>
            <hr />
          </div>
          {characters.map((character) => (
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
