import axios from "axios";
import React, { Component } from "react";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: null,
      characters: [],
      // hasLoaded: false,
      // hasError: false,
      // errorMessage: null,
    }
  }

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.getEpisode(params.episodeId)
  }
    async getEpisode(episodeId) {
      const url = `https://rickandmortyapi.com/api/episode/${episodeId}`;
      const res = await axios.get(url);
          this.setState({
        episode:res.data
      })
    const {episode} = this.state;
      console.log(episode.characters);
    const episodeRes = await axios.all(
      episode.characters.map(async (urlList)=>{
        const urlListResponse = await axios(urlList)
        return urlListResponse.data
      }))
      this.setState({
        characters:episodeRes
      })
    }
  

  render() {
    const { characters } = this.state;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
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
