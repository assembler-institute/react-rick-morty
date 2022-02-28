import React, { Component } from "react";
import axios from "axios";
// import { Spinner } from "reactstrap";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

async function getCharacter(character) {
  // this error is because it's bad formulated??
  const response = await axios.get(character)
    .then(data => (
      data.data
    ));
  return response;
}

async function loadEpisode(episode) {
  const episodeInfo = await axios.get(`https://rickandmortyapi.com/api/episode/${episode}`)
    .then(data => (
      data.data
    ))
  episodeInfo.characters = await loadCharacters(episodeInfo.characters)
  return episodeInfo;
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
