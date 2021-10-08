/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard";
import EpisodeCard from "../../components/EpisodeCard";

export default class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: "",
      episodeList: [],
      id: "",
      name: "",
      image: "",
      species: "",
      status: "",
      origin: "",
      location: "",
    };
  }

  async componentDidMount() {
    await this.loadCharacter();
    await this.loadEpisodeCharacter();
  }

  async loadCharacter() {
    console.log(this);
    const characterId = this.props.match.params.characterId;
    const URL_CHARACTER = `https://rickandmortyapi.com/api/character/${characterId}`;
    const llamada = await axios.get(URL_CHARACTER);
    // console.log(llamada.data.episode);
    const arr = llamada.data.episode;
    // console.log(arr);
    const arr2 = await axios.all(arr.map((episode) => axios.get(episode)));
    console.log(arr2);
    this.setState({
      episodeList: arr2,
    });
    // console.log(episodeList);
  }

  async loadEpisodeCharacter() {
    console.log(this);
    console.log(this.props.match.params.characterId);
    const characterId = this.props.match.params.characterId;
    const URL_CHARACTER = `https://rickandmortyapi.com/api/character/${characterId}`;
    const llamada = await axios.get(URL_CHARACTER);
    const arr = llamada.data;
    console.log(arr);
    this.setState({
      character: arr,
      id: arr.id,
      name: arr.name,
      image: arr.image,
      species: arr.species,
      status: arr.status,
      origin: arr.origin,
      location: arr.location.url,
    });
    console.log(arr.name);
  }

  render() {
    const {
      episodeList,
      id,
      name,
      image,
      species,
      status,
      origin,
      location,
    } = this.state;
    return (
      <div>
        <CharacterCard
          key={id}
          id={id}
          name={name}
          image={image}
          species={species}
          status={status}
          origin={origin}
          location={location}
        />
        <div>
          {episodeList.map((epi) => (
            <EpisodeCard
              key={epi.data.id}
              id={epi.data.id}
              name={epi.data.name}
              airDate={epi.data.air_date}
              episode={epi.data.episode}
            />
          ))}
        </div>
      </div>
    );
  }
}
