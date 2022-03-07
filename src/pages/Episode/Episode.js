import React, { Component } from "react";
import axios from "axios";
// import { Spinner } from "reactstrap";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

async function getCharacter(character) {
  const { data } = await axios.get(character)

  return data;
}

async function loadEpisode(episode) {
  // cambiar a data
  const { data } = await axios.get(`https://rickandmortyapi.com/api/episode/${episode}`)

  data.characters = await loadCharacters(data.characters)
  return data;
}



async function loadCharacters(chars) {
  const characters = await axios.all(chars.map(element => (
    getCharacter(element)
  )))
    .then(data => (
      data
    ))
  return characters

}
class Episode extends Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    this.state = {
      episode: id,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    const { episode } = this.state
    const episodeInfo = await loadEpisode(episode)
    this.setState(prevState => ({
      ...prevState,
      episode: episodeInfo,
      characters: episodeInfo.characters,
      hasLoaded: true,
    }))

  }


  render() {
    const { characters, episode, hasLoaded } = this.state
    return (
      <Layout>
        <section className="row">
          {!hasLoaded &&
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }

          {hasLoaded &&
            <div className="col col-12">
              <h2 className="title">{episode.name}</h2>
              <hr />
              <h5>{`${episode.episode} | ${episode.air_date}`}</h5>
              <hr />
              <div className="row">
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
            </div>
          }
        </section>
      </Layout>
    );
  }
}

export default Episode;
