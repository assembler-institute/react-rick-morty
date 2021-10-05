import React, { Component } from "react";

import Layout from "../../components/Layout";
// import axiosGet, { urlArr } from "../../utils/axiosRequest";
import CharacterCard from "../../components/CharacterCard";
import axios from "axios";
import EpisodeCard from "../../components/EpisodeCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: [],
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadCharacters = this.loadCharacters.bind(this);
  }

  async componentDidMount() {
    this.loadCharacters();
  }

  loadCharacters() {
    console.log(this.props);
    const episodeId = this.props.match.params.id;
    axios
      .get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then((res) => {
        const currentEpisode = res.data;
        this.setState({
          episode: currentEpisode,
        });
        axios
          .all(currentEpisode.characters.map((url) => axios.get(url)))
          .then((data) => {
            const mapCharacter = data.map((character) => character.data);
            this.setState({
              characters: mapCharacter,
              hasLoaded: true,
              hasError: false,
            });
          });
      });
  }

  render() {
    const { episode, characters } = this.state;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <EpisodeCard
              episodeId={episode.id}
              name={episode.name}
              episode={episode.episode}
              airDate={episode.air_date}
            />
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
        </section>
      </Layout>
    );
  }
}

export default Episode;
