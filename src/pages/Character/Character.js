/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import axios from 'axios';

class Character extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      name: "",
      species: undefined,
      status: undefined,
      origin: undefined,
      location: undefined
    }

    this.loadCharacter = this.loadCharacter.bind(this)

  }

  async componentDidMount() {
    this.loadCharacter()
  }

  async loadCharacter() {
    console.log(this)
    // console.log(this.props.match.params.characterId)
    // const characterId = this.props.match.params.characterId
    const character = await axios.get(`https://rickandmortyapi.com/api/character/1`)
    const characterInfo = character.data
    console.log(characterInfo)
    this.setState({
      image: characterInfo.image,
      name: characterInfo.name,
      species: characterInfo.species,
      status: characterInfo.status,
      origin: characterInfo.origin.name,
      location: characterInfo.location.name
    })

  }


  render() {
    const { image, name, species, status, origin, location } = this.state
    return (
      <div>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <h6><strong>Character</strong></h6>
        <p>{species} | {status}</p>
        <h6><strong>Origin</strong></h6>
        <p>{origin}</p>
        <h6><strong>Location</strong></h6>
        <p>{location}</p>

      </div>
    )
  }
}

export default Character;
