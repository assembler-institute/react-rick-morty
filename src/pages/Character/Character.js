import React from "react";
import * as routes from "../../constants/routes";
import axios from "axios";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import EpisodeCard from "../../components/EpisodeCard/EpisodeCard";
import ButtonGoBack from "../../components/ButtonGoBack";

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: [],
      episodes: [],
      hasLoaded: false,
    };
  }

  async componentDidMount() {
    this.loadCharacter();
  }

  async loadCharacter() {
    const characterId = this.props.match.params.id;

    axios
      .get(`https://rickandmortyapi.com/api${routes.CHARACTER}/${characterId}`)
      .then((result) => {
        const newEpisode = result.data.episode;

        axios.all(newEpisode.map((url) => axios.get(url))).then((request) => {
          const res = request.map((i) => i.data);
          this.setState({
            character: result.data,
            episodes: res,
            hasLoaded: true,
          });
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { character, episodes, hasLoaded } = this.state;
    const { history } = this.props;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <ButtonGoBack path={history} />
          </div>
          {hasLoaded && (
            <CharacterCard
              id={character.id}
              name={character.name}
              image={character.image}
              status={character.status}
              location={character.location}
              origin={character.origin}
            />
          )}
          <div className="col col-12">
            <h5>Episodes</h5>
          </div>
          {hasLoaded &&
            episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
            ))}
        </section>
      </Layout>
    );
  }
}

export default Character;
