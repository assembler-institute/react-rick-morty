import React, { Component } from "react";
//import CharacterCard from "../../components/CharacterCard";
import Layout from "../../components/Layout";
//import axiosGet, { urlArr } from "../../utils/axiosRequest";

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
  componentDidMount() {
    this.loadCharacter();
  }

  loadCharacter() {
    console.log(this.props);
  }

  render() {
    const { character } = this.state;
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <h1>Hello!!! {character}</h1>
            {/*{characters.map((character) => (
              <CharacterCard
                characterId={character.id}
                image={character.image}
                name={character.name}
                species={character.species}
                status={character.status}
                origin={character.origin.name}
                location={character.location.name}
              />
            ))}*/}
          </div>
        </section>
      </Layout>
    );
  }
}
