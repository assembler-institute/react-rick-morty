import React, { Component } from "react";

import Layout from "../../components/Layout";
/* import { EPISODE, URL } from "../../constants/routes"; */
// import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    // episode: null,
    // characters: [],
    // hasLoaded: false,
    // hasError: false,
    // errorMessage: null,
  }

  render() {
    return (
      <Layout>
        <section className="row">
          <div className="col col-12">
            <p>Hola</p>
            {/* {characters.map((character) => (
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
            ))} */}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
