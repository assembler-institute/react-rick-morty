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
    };
    // ,
    //
    // hasLoaded: false,
    // hasError: false,
    // errorMessage: null,
  }

  componentDidMount() {
    axios.get("https://rickandmortyapi.com/api/episode/1").then((data) => {
      data.data.characters.forEach((element) => {
        let newElement = element.split("/");
        newElement = newElement[newElement.length - 1];
        console.log(newElement);
      });

      this.setState({
        episode: data.data.episode,
        characters: data.data.characters,
      });
    });
  }

  render() {
    const { episode, characters } = this.state;

    return (
      <>
        <Layout>
          <section className="row">
            <div className="col col-12">
              {/* {characters.map((character, idx) => (
                

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
      </>
    );
  }
}

export default Episode;
