import React, { Component } from "react";

import { axios } from "axios";

import { getEpisode, getUrl } from "../../api";


import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

function makePromises(urls = []) {
  const myArray = urls.map((url) => getUrl(url));
  // onsole.log(myArray);
  return myArray;
}

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
    this.loadEpisode = this.loadEpisode.bind(this);
  }

  componentDidMount() {
    // console.log(this.props);

    const { match } = this.props;
    const { episodeId } = match.params;
    // console.log(episodeId);

    /*
     * La siguiente funcion se ejecuta al cargarse este mismo componente
     * y ademas le asignamos como parametro el episodeId que llevará el mismo numero
     * de episodio que hemos clickado.
     */
    this.loadEpisode(episodeId);
  }

  async loadEpisode(episodeId) {
    // console.log(this);
    /*
     * Aquí lo que hacemos es encapsular dentro de DATA, toda la informacion
     * del episodio que nos traemos del API
     */

    try {
      const { data } = await getEpisode(episodeId);
      /*
      * Esta funcion nos llama a otra funcion que dentro nos devuelve un Array mediante un map
      * en la siguiente variante, haremos lo mismo pero de forma manual (NO RECOMENDABLE)
      */
      // eslint-disable-next-line compat/compat
      const characterResponse = await Promise.all(
        makePromises(data.characters),
      );

      // const promises = data.characters.map((character) => axios.get(character));

      /*
      * Ademas, axios, siempre nos devuelve las propiedades que necesitamos dentro de un objeto y dentro del objeto en DATA.
      * para solucionarlo, debemos recorrer cada objeto, sacando ese DATA y guardandolo
      * en un nuevo array con ese contenido.
      */
      const characters = characterResponse.map((character) => character.data);

      this.setState({
        hasLoaded: true,
        episode: data,
        characters: characters,
      });

      console.log(data);
      console.log(characterResponse);
      // console.log(promises);
      console.log(characters);
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
      episode,
      characters,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;
    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p> Episode not loaded...</p>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <p> Something went wrong </p>
              <p>{errorMessage}</p>
            </div>
          )}
          {/* <hr />
          {episode && JSON.stringify(episode, null, 2)}
          <hr /> */}
          {characters.length > 0 &&
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
        </section>
      </Layout>
    );
  }
}

export default Episode;
