import React, { Component } from "react";
import CharacterCard from "../../components/CharacterCard";
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
    await axiosId(urlArr[2], charId).then((res) =>
      this.setState({
        character: res.data,
        hasLoaded: true,
        hasError: false,
      }),
    );
  }

  render() {
    const { character, hasLoaded, hasError } = this.state;
    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-12">
              <h1>Hello!!! {character.name}</h1>
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
          </section>
        )}
      </Layout>
    );
  }
}
