import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

import * as routes from "../../constants/routes";

class Character extends Component {
  constructor(props) {
    super(props)

    this.state = {
      episodes: []
    }
  }

  componentDidMount() {
    this.loadCharacter()
    this.loadEpisodes()
  }

  async loadCharacter() {
    // let characterID = window.location.pathname.slice(11)
    // const res = await axios.get(`https://rickandmortyapi.com/api/character/${characterID}`)
    const res = await axios.get(`https://rickandmortyapi.com/api/${this.props.location.pathname}`)

    this.setState({
      id: res.data.id,
      name: res.data.name,
      image: res.data.image,
      species: res.data.species,
      status: res.data.status,
      location: res.data.location.name,
      origin: res.data.origin.name,
      origin_url: res.data.origin.url,
    })
  }

  async loadEpisodes() {
    // let characterID = window.location.pathname.slice(11)
    // const res = await axios.get(`https://rickandmortyapi.com/api/character/${characterID}`)
    const res = await axios.get(`https://rickandmortyapi.com/api/${this.props.location.pathname}`)
    
    const promiseArray = res.data.episode.map(episodeURL => axios.get(episodeURL))

    try {
      const episodesInfo = (await axios.all(promiseArray)).map(response => response.data)
      this.setState({ episodes: episodesInfo })
    } catch(error) {
      console.error(error)
    }
    
  }

  render() {
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <div className="d-flex justify-content-start">
              <img src={this.state.image} alt={`${this.state.name} image`}/>
              <div className="ml-5">
                <div className="d-flex justify-content-between w-100">
                  <h2>{this.state.name}</h2>
                  <button className="col col-3 align-self-end mb-3 btn btn-primary" onClick={this.props.history.goBack}>Go back</button>
                </div>
                <div className="mt-4">
                  <h6>CHARACTER</h6>
                  <span className="mr-1">{this.state.species}</span>
                  <span className="mr-1">|</span>
                  <span>{this.state.status}</span>
                  <div className="d-flex mt-3">
                    <div className="mr-4">
                      <h6>ORIGIN</h6>
                      <span>{this.state.origin}</span>
                    </div>
                    <div>
                      <h6>LOCATION</h6>
                      <Link to={`${routes.LOCATION}/${this.state.id}`}>
                        <span>{this.state.location}</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="col col-12">
            <h4 className="ml-3 mt-3">Episodes</h4>
            <div className="col col-12 d-flex flex-wrap">
              {this.state.episodes.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  id={episode.id}
                  name={episode.name}
                  airDate={episode.air_date}
                  episode={episode.episode}
                />
              ))}
            </div>
          </div>
        </section>
      </Layout>
  )}
}

export default withRouter(Character)