import React, { Component } from "react";
import { getEpisode, getUrls } from "../../components/api/api";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

function makePromises(charactersUrls=[]){
  return charactersUrls.map((characterUrl) =>getUrls(characterUrl) )


}
class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
       // episode: null,
        characters: [],
       hasLoaded: false,
       hasError: false,
       errorMessage: null,
    };
  this.loadEpisodes = this.loadEpisodes.bind(this);
  }

  componentDidMount(){
   const{match} = this.props;
   console.log(match)
   const {episodeId} = match.params;
   this.loadEpisodes(episodeId)
  }
  
  async loadEpisodes(episode) { 
    try{
   const {data}= await getEpisode(episode);
   const chacactersCall=await Promise.all(makePromises(data.characters))
   const dataCharacters=chacactersCall.map((caracter) => caracter.data)
   console.log(dataCharacters)
   this.setState({
    characters:dataCharacters,
    hasLoaded:true,
    hasError:false
    })
    }catch{
    this.setState({
      
      hasError:true
    })
    }
  }

  render() {
    const { characters,
            hasLoaded,
            hasError,
            errorMessage
          } = this.state;
    return (
      <Layout>
        <section className="row">
        {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )} 
           {!hasLoaded &&  (
            <div className="col col-12">
              <h1>Is loading , Wait!!</h1>
            </div>
          )} 
          {hasError && (
          <div className="col col-12"> 
            <h1>{errorMessage}</h1>
          </div>
          )}
          <div className="col col-12">
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
      </Layout>
    );
  }
}

export default Episode;
