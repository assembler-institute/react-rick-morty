import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import { makeRequest } from '../../api';

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: null,
      type: null,
      dimension: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
    }
  }

  async componentDidMount() {
    // Get episode ID by regex, best would be by query param in URL
    const path = window.location.pathname
    const id = path.match(/(\d.*$)/)[0]

    const [response, error] = await makeRequest(`https://rickandmortyapi.com/api/location/${id}`)

    if (!error) {
      const {data} = response
      const promises = data.residents.map(url => makeRequest(url))

      Promise.all(promises)
      .then(responses => ( 
        this.setState({
          id: data.id,
          name: data.name,
          type: data.type,
          dimension: data.dimension,
          characters: responses.map(res => res[0].data),
          hasError: false,
          hasLoaded: true
        })
      ))

    } else {
      this.setState({
        hasLoaded: false,
        hasError: true
      })
    }
  }

  render() {

    const {id, name, type, dimension, characters, hasError, hasLoaded} = this.state
    console.log(characters)
    return(
      <Layout>
        <section className="row">
          <div className="col col-12">
            {!hasLoaded && (<h1>Loading...</h1>)}
            {hasError && (<h1>API error</h1>)}

            {!hasError && hasLoaded && (
              <div className="card">
                  <div className="card-body">
                      <h3 className="card-title">{name}</h3>
                      <hr/>
                      <div className="card-text">
                        <h5 className="text-bold">Type</h5>
                        <p>{type}</p>
                      </div>
                      <div className="card-text">
                        <h5 className="text-bold">Dimension</h5>
                        <p>{dimension}</p>
                      </div>
                  </div>
              </div>
            )}
          </div>

          <div className="col col-12">
            <hr />
          </div>

          {characters.length > 0 && (
              <div className="col col-12">
                <ul className="list-group-flush pl-0">
                {characters.map(character => (
                  <li className="list-group-item" key={character.id}>
                    <CharacterCard
                      key={character.id}
                      id={character.id}
                      name={character.name}
                      image={character.image}
                      species={character.species}
                      status={character.status}
                      origin={character.origin}
                      location={character.location}
                      showMoreDetails
                    />
                  </li>
                ))}
                </ul>
              </div>
          )}
          
        </section>
      </Layout>
    )
  }
}

export default Location