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
              <div className="row">
                <div className="col col-6 col-sm-6 col-xl-3 CharacterCard">
                  <img
                    className="CharacterCard__img"
                    src={character.image}
                    alt=""
                  />
                </div>
                <div className="pl-5 col col-6 ">
                  <h3 className="CharacterCard__name h4">{character.name}</h3>
                  <hr />
                  <h4 className="CharacterCard__name h6">CHARACTER</h4>
                  <div className="CharacterCard__meta">
                    <p className="CharacterCard__meta-item">
                      {character.origin.name} | {character.status}
                    </p>
                  </div>
                  <div className="row m-0">
                    <div>
                      <h4 className="CharacterCard__name h6">ORIGIN</h4>
                      <div className="CharacterCard__meta">
                        <p className="CharacterCard__meta-item">
                          {character.origin.name} | {character.status}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="CharacterCard__name h6">LOCATION</h4>
                      <div className="CharacterCard__meta">
                        <p className="CharacterCard__meta-item">
                          {character.location.name} | {character.status}
                        </p>
                      </div>
                    </div>
                  </div>
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
