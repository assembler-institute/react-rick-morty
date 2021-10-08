import React, { Component } from "react";
import { makeRequest } from '../../api'

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
  }

  async componentDidMount() {
    // Get episode ID by regex, best would be by query param in URL
    const path = window.location.pathname
    const id = path.match(/(\d.*$)/)[0]

    const [response, error] = await makeRequest(`https://rickandmortyapi.com/api/episode/${id}`)
    
    if (!error) {
      const {data} = response
      const promises = data.characters.map(url => makeRequest(url))
      Promise.all(promises)
      .then(responses => (
        this.setState({
          episode: data.episode,
          characters: responses.map(res => res[0].data),
          hasLoaded: true,
          hasError: false
        })
      ))
    } else {
      this.setState({
        hasLoaded: false,
        hasError: true
      })
    }
  }

  render() {

    const {characters, episode, hasLoaded, hasError, errorMessage} = this.state

    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            {!hasLoaded && (<h1>Loading...</h1>)}
            {hasError && (<h1>API error</h1>)}

            {characters.length > 0 && hasLoaded && characters.map((character) => (
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
    );
  }
}

export default Episode;
