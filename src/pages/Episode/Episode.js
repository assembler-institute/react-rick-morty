/* eslint-disable no-console */
import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: null,
      name: "",
      airDate: "",
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.loadEpisode();
  }

  async loadEpisode() {
    console.log(this);
    // eslint-disable-next-line react/destructuring-assignment
    const id = this.props.match.params.id;
    const baseURL = `https://rickandmortyapi.com/api/episode/ ${id}`;
    try {
      const APIcall = await axios.get(baseURL);
      const charArray = APIcall.data.characters;
      const chars = await axios.all(
        charArray.map((charURL) => axios.get(charURL)),
      );

      this.setState({
        episode: APIcall.data.episode,
        characters: chars,
        name: APIcall.data.name,
        airDate: APIcall.data.air_date,
        hasLoaded: true,
      });
    } catch (err) {
      this.setState({
        hasError: false,
        errorMessage: "Episode not found!!",
      });
    }
  }

  render() {
    const {
      hasLoaded,
      hasError,
      errorMessage,
      characters,
      name,
      airDate,
      episode,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            {hasLoaded && !hasError ? (
              <>
                <h3 className="Episode__name h5">{name}</h3>
                <div className="Episode__meta">
                  <p className="Episode__meta-item">{airDate}</p>
                  <p className="Episode__meta-item">|</p>
                  <p className="Episode__meta-item">{episode}</p>
                </div>
              </>
            ) : (
              <h1>{errorMessage}</h1>
            )}
          </div>
          <div className="col col-12">
            <hr />
          </div>

          {characters.map((character) => (
            <CharacterCard
              key={character.data.id}
              id={character.data.id}
              name={character.data.name}
              image={character.data.image}
              species={character.data.species}
              status={character.data.status}
              origin={character.data.origin}
            />
          ))}

          <div className="col col-12">
            <hr />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
