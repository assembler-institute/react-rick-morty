import axios from "axios";
import React, { Component } from "react";
import CharacterCard from "../../components/CharacterCard";
import EpisodeCard from "../../components/EpisodeCard/EpisodeCard";
import Layout from "../../components/Layout";
import { axiosId, urlArr } from "../../utils/axiosRequest";

export default class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
    };
    this.loadCharacter = this.loadCharacter.bind(this);
  }
  async componentDidMount() {
    this.loadCharacter();
  }

  async loadCharacter() {
    let charId = this.props.match.params.id;
    await axiosId(urlArr[2], charId).then((res) => {
      const currentCharacter = res.data;
      this.setState({
        character: currentCharacter,
        hasLoaded: true,
        hasError: false,
      });
      axios
        .all(currentCharacter.episode.map((url) => axios.get(url)))
        .then((res) => {
          const episodeList = res.map((epi) => {
            return epi.data;
          });
          this.setState({
            episodes: episodeList,
          });
        });
    });
  }

  render() {
    const { character, hasLoaded, hasError, episodes } = this.state;
    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-12">
              <h2>Hello!!! {character.name}</h2>
              <CharacterCard
                characterId={character.id}
                image={character.image}
                name={character.name}
                species={character.species}
                status={character.status}
                origin={character.origin.name}
                location={character.location.name}
              />
            </div>
            <div className="col col-12">
              {episodes.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  episodeId={episode.id}
                  name={episode.name}
                  airDate={episode.air_date}
                  episode={episode.episode}
                />
              ))}
            </div>
          </section>
        )}
      </Layout>
    );
  }
}
