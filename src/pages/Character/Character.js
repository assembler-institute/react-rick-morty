import axios from "axios";
import React, { Component } from "react";
import EpisodeCard from "../../components/EpisodeCard";
import Layout from "../../components/Layout";

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      character: {},
      episodes: [],
    };
  }

  componentDidMount() {
    // this.getCharacterById();
    const { match } = this.props;
    const characterId = match.params.characterId;
    axios
      .get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((data) => {
        this.setState({ character: data.data });
        const episodeUrls = data.data.episode;
        console.log(episodeUrls);
        axios
          .all(episodeUrls.map((episodeUrl) => axios.get(episodeUrl)))
          .then((dataCollection) => {
            const episodes = dataCollection.map(
              (collectionData) => collectionData.data,
            );
            this.setState({ episodes: episodes, isLoaded: true });
          });
      });
  }

  render() {
    const { character, isLoaded, episodes } = this.state;
    console.log(episodes);

    return (
      <>
        <Layout>
          {isLoaded && (
            <div>
              <div className="col col-12 col-sm-6 col-xl-3 CharacterCard">
                <img
                  className="CharacterCard__img"
                  src={character.image}
                  alt=""
                />
                <h3 className="CharacterCard__name h4">{character.name}</h3>
                <div className="CharacterCard__meta">
                  {character.origin.name}

                  <p className="CharacterCard__meta-item">|</p>
                  <p className="CharacterCard__meta-item">{character.status}</p>
                </div>
              </div>

              <div className="row">
                {episodes.map((episode) => (
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
          )}

          {/* <CharacterCard
            name={character.name}
            race
            status
            origin
            location
          /> */}
        </Layout>
      </>
    );
  }
}

export default Character;
