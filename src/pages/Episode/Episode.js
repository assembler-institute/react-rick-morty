import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      episode: null,
      air_date: null,
      characters: [],
      hasLoaded: true,
      hasError: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    this.loadEpisode()
    this.loadCharacters()
    console.log(this.props);
  }

  async loadEpisode() {
    // let episodeId = window.location.pathname.slice(9)
    // const res = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
    const res = await axios.get(`https://rickandmortyapi.com/api/${this.props.location.pathname}`)

    this.setState({
      name: res.data.name,
      episode: res.data.episode,
      air_date: res.data.air_date,
    })
  }

  // * JUST TESTING, WILL ERASE LATER
  // async loadCharacters() {
  //   let episodeId = window.location.pathname.slice(9)
  //   const res = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)

  //   let newArray = []
  //   await res.data.characters.forEach(urlCharacter => {
  //     axios.get(urlCharacter)
  //       .then(response => newArray.push(response.data))
  //   })

  //   setTimeout(() => {
  //     this.setState({characters: newArray})
  //   }, 50)
  // }

  async loadCharacters() {
    // let episodeId = window.location.pathname.slice(9)
    // const res = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
    const res = await axios.get(`https://rickandmortyapi.com/api/${this.props.location.pathname}`)

    const promiseArray = res.data.characters.map(characterURL => axios.get(characterURL))

    try {
      const charactersInfo = (await axios.all(promiseArray)).map(response => response.data)
      this.setState({ characters: charactersInfo })
    } catch(error) {
      console.error(error)
    }
  }

  render() {
    return (
      <Layout>
        <section className="row">
          <div className="d-flex justify-content-between w-75">
            <div className="col col-12">
              <h1 className="col col-12">{this.state.name}</h1>
              <p className="col col-12">{this.state.episode} | {this.state.air_date}</p>
            </div>
            <button className="col col-2 align-self-end mb-3 btn btn-primary" onClick={this.props.history.goBack}>Go back</button>
          </div>
          <div className="col col-12 d-flex flex-wrap">
            {this.state.characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
                status={character.status}
                origin={character.origin}
                location={character.origin.url}
              />
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}

export default withRouter(Episode);