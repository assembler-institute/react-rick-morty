import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as routes from "../../constants/routes";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { makeRequest } from '../../api';

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {
        image: null,
        name: null,
        species: null,
        status: null,
        origin: null,
        location: null
      },
      episodes: [],
      hasError: false,
      hasLoaded: false
    }
  }

  async componentDidMount() {
    // Get episode ID by regex, best would be by query param in URL
    const path = window.location.pathname
    const id = path.match(/(\d.*$)/)[0]

    const [response, error] = await makeRequest(`https://rickandmortyapi.com/api/character/${id}`)

    if (!error) {
      const {data} = response
      const promises = data.episode.map(url => makeRequest(url))

      const characterLocation = await makeRequest(data.location.url)

      const character = {
        image: data.image,
        name: data.name,
        species: data.species,
        status: data.status,
        origin: data.origin,
        location: characterLocation[0].data 
      }

      Promise.all(promises)
      .then(responses => ( 
        this.setState({
          character: character,
          episodes: responses.map(res => res[0].data),
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

    const {character, episodes, hasError, hasLoaded} = this.state
    return(
      <Layout>
        <section className="row">
          <div className="col col-12">
            {!hasLoaded && (<h1>Loading...</h1>)}
            {hasError && (<h1>API error</h1>)}

            {!hasError && hasLoaded && (
              <div className="card justify-content-between flex-md-row">
                  <img className="img-fluid" src={character.image} alt={character.name} />
                  <div className="card-body">
                      <h3 className="card-title">{character.name}</h3>
                      <hr/>
                      <div className="card-text">
                        <h5 className="text-bold">Character</h5>
                        <p>{character.species} | {character.status}</p>
                      </div>
                      <div className="card-text">
                        <h5 className="text-bold">Origin</h5>
                        <p>{character.origin.name}</p>
                      </div>
                      <div className="card-text">
                        <h5 className="text-bold">Location</h5>
                        <p><Link to={`${routes.LOCATION}/${character.location.id}`}>{character.location.name}</Link></p>
                      </div>
                  </div>
              </div>
            )}
          </div>

          <div className="col col-12">
            <hr />
          </div>

          {episodes.length > 0 && (
              <div className="col col-12">
                <ul className="row list-group-flush pl-0">
                {episodes.map(episode => (
                  <li className="col-md-6 col-sm-12 list-group-item" key={episode.id}>
                      <EpisodeCard
                        key={episode.id}
                        id={episode.id}
                        name={episode.name}
                        airDate={episode.air_date}
                        episode={episode.episode}
                        />
                  </li>
                ))}
                </ul>
              </div>
          )}
          
        </section>
      </Layout>
    )
  }
}

export default Character