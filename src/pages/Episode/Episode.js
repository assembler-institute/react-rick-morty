import axios from "axios";
import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: null,
      characters: [],
      hasLoaded: false,
    };
    // ,
    //
    //
    // hasError: false,
    // errorMessage: null,
  }

  componentDidMount() {
    this.getCharacters();
  }

  getOneCharacter(character) {
    this.setState({ characters: character });
    return axios.get(character);
  }

  getCharacters() {
    const { match } = this.props;
    const { episodeId } = match.params;
    axios
      .get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then((apiEpisode) => {
        this.setState({
          episode: apiEpisode.data.episode,
        });

        const characterUris = apiEpisode.data.characters;

        axios
          .all(
            characterUris.map((char) => {
              return this.getOneCharacter(char);
            }),
          )
          .then((data) => {
            const charactersArr = data.map((characterData) => {
              return characterData.data;
            });
            this.setState({ characters: charactersArr, hasLoaded: true });
          });
      });
  }

  render() {
    const { episode, characters, hasLoaded } = this.state;
    setTimeout(console.log(characters), 500);
    // console.log(characters);
    console.log(hasLoaded);
    if (!hasLoaded) {
      return <div />;
    }
    return (
      <>
        <Layout>
          <section className="row">
            <div className="col col-12">
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
            </div>
          </section>
        </Layout>
      </>
    );
  }
}

export default Episode;
