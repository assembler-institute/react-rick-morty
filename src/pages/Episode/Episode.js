import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../../components/Layout";
import { EPISODE, URL } from "../../constants/routes";
import CharacterCard from "../../components/CharacterCard";

const axios = require("axios");

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      episode: null,
      airDate: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    await this.loadSingleEpisode();
  }

  async loadSingleEpisode() {
    try {
      const { id } = this.props;
      const response = await axios.get(`${URL}${EPISODE}/${id}`);
      const data = response.data;
      const { name, episode, air_date: airDate, characters } = data;
      const pjs = characters.map((pj) => axios.get(pj));
      const charactersArr = [];
      // eslint-disable-next-line compat/compat
      await Promise.all(pjs).then((result) =>
        result.forEach((r) => charactersArr.push(r.data)),
      );
      this.setState({
        name: name,
        episode: episode,
        airDate: airDate,
        characters: charactersArr,
        hasLoaded: true,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        hasError: true,
      });
    }
  }

  render() {
    const {
      characters,
      hasLoaded,
      hasError,
      errorMessage,
      episode,
      name,
      airDate,
    } = this.state;
    return (
      <>
        <Layout>
          {hasLoaded && !hasError && (
            <section className="row">
              <div className="col col-12">
                <h1>{name}</h1>
                <p>
                  {episode} / {airDate}
                </p>
                {characters.map((character) => (
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
              </div>
            </section>
          )}

          {hasError && (
            <div className="col col-12">
              <h1>Something went wrong...</h1>
              <h2 className="errorMessage">{errorMessage}</h2>
            </div>
          )}
        </Layout>

        <BrowserRouter>
          <Switch>
            <Route></Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default Episode;
