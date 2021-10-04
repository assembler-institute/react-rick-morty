import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import rickImg from "../../images/icons/rick-sanchez.svg"

class Location extends Component {
  constructor(props) {
    super(props)

    this.state = {
      residents: [],
    }
  }

  componentDidMount() {
    this.loadLocation()
  }

  async loadLocation() {
    // let locationID = window.location.pathname.slice(10)
    // const response = await axios.get(`https://rickandmortyapi.com/api/location/${locationID}`)
    const response = await axios.get(`https://rickandmortyapi.com/api/${this.props.location.pathname}`)

    this.setState({
      name: response.data.name,
      type: response.data.type,
      dimension: response.data.dimension,
    })
    this.loadResidents(response)
  }

  async loadResidents(response) {
    
    try {
      const promiseArray = response.data.residents.map(residentURL => axios.get(residentURL))
      const residentsInfo = (
        await axios.all(promiseArray)
      ).map(res => res.data)
      
      this.setState({ residents: residentsInfo })
      
    } catch(error) {
      console.error(error)
    }
}

  render() {
    return (
      <Layout>
        <section className="row">
          { this.state.name !== undefined &&
            <>
            <div className="col col-12">
              <h1 className="col col-12 col-sm-6 col-xl-3">{this.state.name}</h1>
              <p className="col col-12 col-sm-6 col-xl-3">{this.state.type} | {this.state.dimension}</p>
            </div>
            <div className="col col-12 d-flex flex-wrap">
            {this.state.residents.map((character) => (
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
          </>
          }
          {this.state.name === undefined &&
            <div className="col col-12">
              <h1 className="col col-12">This location doesn't exist, Rick! <img src={rickImg} alt="Rick"/></h1>
            </div>
          }
        </section>
      </Layout>
    )
  }
}

export default withRouter(Location)