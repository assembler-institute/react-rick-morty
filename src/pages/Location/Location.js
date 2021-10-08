/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import axios from "axios"
import "../../components/CharacterCard/CharacterCard.scss"
import Layout from '../../components/Layout'

import CharacterCard from '../../components/CharacterCard'

export default class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      type: "",
      dimension: "",
      residents: []
    }
  }


  componentDidMount() {
    this.loadLocation()
  }

  async loadLocation() {
    // console.log(this.props)
    const locationId = this.props.match.params.locationId

    const URL = `https://rickandmortyapi.com/api/location/${locationId}`

    const APIcall = await axios.get(URL)
    // console.log(APIcall.data)
    const res = APIcall.data
    this.setState({
      name: res.name,
      type: res.type,
      dimension: res.dimension
    })

    const residentURL = `https://rickandmortyapi.com/api/location/${locationId}`
    const API = await axios.get(residentURL)
    // console.log(API.data.residents)
    const URLs = API.data.residents
    const arr1 = await axios.all(URLs.map((resident) => axios.get(resident)))
    console.log(arr1)

    this.setState({
      residents: arr1
    })




  }


  render() {
    const { name, type, dimension, residents } = this.state
    return (
      <>
        <Layout className="row  g-0">
          <h1>Location</h1>
          <p>{name}</p>
          <p>{type}</p>
          <p>{dimension}</p>
          <div className="row">
            {residents.map((resi) =>
              <CharacterCard
                className="CharacterCard"
                key={resi.data.id}
                characterId={resi.data.id}
                name={resi.data.name}
                image={resi.data.image}
                species={resi.data.species}
                status={resi.data.status}
                origin={resi.data.origin}
                location={resi.data.location.url}
              />
            )}

          </div>
        </Layout>

      </>
    )
  }
}
