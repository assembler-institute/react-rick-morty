import React, { Component } from "react";
import axios from "axios";
import { getCharacter } from "../../api";
import Layout from "../../components/Layout";

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      status: "",
      originName: "",
      locationName:"",
      image: "",
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadCharacter = this.loadCharacter.bind(this);
  }

  componentDidMount() {
    // console.log(this.props);
    const { match } = this.props;
    const { characterId } = match.params;
    console.log(characterId);
    this.loadCharacter(characterId);
  }

  async loadCharacter(characterId) {
    try {
      const { data } = await getCharacter(characterId);

      const promises = data.episode.map((episode) => axios.get(episode));
      // eslint-disable-next-line compat/compat
      const episodesResponse = await Promise.all(promises);

      const episodes = episodesResponse.map((episode) => episode.data);
      console.log({ data });
      console.log({ episodesResponse });
      console.log({ episodes });
      this.setState({
        name: data.name,
        status: data.status,
        originName: data.origin.name,
        locationName: data.location.name,
        image: data.image,
        episodes: episodes,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: error.message,
      });
    }
  }

  render() {
    const {
      name,
      status,
      originName,
      locationName,
      image,
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        {!hasLoaded && (
          <div className="col col-12">
            <h1>Loading character...</h1>
          </div>
        )}
        {hasError && (
          <div className="col col-12">
            <h1>Unable to load character. Something went wrong!</h1>
            <p>{errorMessage}</p>
          </div>
        )}

        <div className="col col-12">
          <hr />
          {JSON.stringify(episodes, null, 2)}
          <hr />
        </div>
        {/* <section className="row">
          {hasLoaded &&
            !hasError &&
            characters.length > 0 &&
            characters.map((character) => (
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
        </section> */}
      </Layout>
      //   <></>
    );
  }
}

export default Character;
