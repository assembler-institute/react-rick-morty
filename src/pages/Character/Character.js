import React, { Component } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import EpisodeCard from "../../components/EpisodeCard";
import { LOCATION } from "../../constants/routes";

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: null,
      hasLoaded: false,
      hasError: false,
      errorMessage: "",
      episode: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { charId } = match.params;
    try {
      const char = await axios.get(
        `https://rickandmortyapi.com/api/character/${charId}`,
      );

      const episodeLinks = char.data.episode;
      const promise = episodeLinks.map((epi) => axios.get(epi));
      const res = await Promise.all(promise);
      const episodeList = res.map((e) => e.data);

      this.setState({
        character: char.data,
        hasLoaded: true,
        hasError: false,
        episode: episodeList,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        errorMessage: error,
      });
    }
  }

  render() {
    const {
      character,
      hasError,
      hasLoaded,
      errorMessage,
      episode,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            {hasLoaded && !hasError && (
              <div>
                {" "}
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  image={character.image}
                  species={character.species}
                  status={character.status}
                  origin={character.origin}
                  location={character.location}
                />{" "}
              </div>
            )}
            {!hasLoaded && hasError && (
              <div>
                <p>Failed To Load Character</p>
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
          <div className="col col-12">
            <hr />
          </div>
          <div className="row col-12">
            {hasLoaded &&
              episode.map((epiCard) => (
                <EpisodeCard
                  key={epiCard.id}
                  id={epiCard.id}
                  name={epiCard.name}
                  airDate={epiCard.air_date}
                  episode={epiCard.episode}
                />
              ))}
          </div>
          <div className="col col-12">
            <hr />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Character;
