/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import axios from 'axios';
import EpisodeCard from '../../components/EpisodeCard';


class Character extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      name: "",
      species: undefined,
      status: undefined,
      origin: undefined,
      location: undefined,
      episodesCharacter: []
    }


  }

  componentDidMount() {
    this.loadCharacter()
    this.loadEpisodesCharacter()
  }

  async loadCharacter() {

    const characterId = this.props.match.params.characterId
    const character = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
    const characterInfo = character.data
    this.setState({
      image: characterInfo.image,
      name: characterInfo.name,
      species: characterInfo.species,
      status: characterInfo.status,
      origin: characterInfo.origin.name,
      location: characterInfo.location.name
    })
  }

  async loadEpisodesCharacter() {
    const id = this.props.match.params.characterId
    const episodesList = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
    const arr = episodesList.data.episode
    const result = await axios.all(arr.map((episode) => axios.get(episode)))
    this.setState({
      episodesCharacter: result
    })
  }




  render() {
    const { image, name, species, status, origin, location, episodesCharacter } = this.state
    return (
      <>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={image} alt={name} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2>{name}</h2>
                <hr />
                <h6><strong>Character</strong></h6>
                <p>{species} | {status}</p>
                <div className="d-flex">
                  <div>
                    <h6><strong>Origin</strong></h6>
                    <p>{origin}</p>
                  </div>
                  <div>
                    <h6><strong>Location</strong></h6>
                    <p>{location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr />
          <h3>Episodes</h3>
          <hr />
          <div className="row">
            <div className="row m-5">
              {episodesCharacter.map((episode) =>
                <EpisodeCard

                  key={episode.data.id}
                  episodeId={episode.data.id}
                  name={episode.data.name}
                  airDate={episode.data.air_date}
                  episode={episode.data.episode}
                />
              )}
            </div>
          </div>
        </div>
      </>


    )
  }
}

export default Character;
