import React from "react";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      character: null,
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${params.characterId}`,
      );
      const json = await response.json();

      console.log(json);

      this.setState({
        character: json,
      });

      let episodes = await Promise.all(
        json.episode.map(async (url) => {
          const response = await fetch(url);
          return response.json();
        }),
      );

      console.log(episodes);

      this.setState({
        episodes: episodes,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
      });
    }
  }

  render() {
    const { character, episodes, hasLoaded, hasError } = this.state;
    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col row">
              <div className="col col-12 col-lg-3 mb-3">
                <img className="CharacterCard__img" src={character.image} />
              </div>
              <div className="col col-12 col-lg-9">
                <div className="col col-12">
                  <h1>{character.name}</h1>
                  <hr />
                </div>
                <div className="col col-12 ">
                  <div className="mb-3">
                    <h6>CHARACTER</h6>
                    {character.species} | {character.status}
                  </div>
                  <div className="d-inline-block pr-3 pb-3">
                    <h6>ORIGIN</h6>
                    {character.origin.name}
                  </div>
                  <div className="d-inline-block">
                    <h6>LOCATION</h6>
                    {character.location.name}
                  </div>
                </div>
              </div>
              <hr />
            </div>

            <div className="col col-12 pb-3">
              <hr />
              <h5>Episodes</h5>
            </div>
            {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
                characters={episode.characters}
              />
            ))}
          </section>
        )}
      </Layout>
    );
  }
}

export default Character;
