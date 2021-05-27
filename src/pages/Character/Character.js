import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { getEpisode, getCharacters } from "../../components/api/api";
import Layout from "../../components/Layout";
import { getCharacter, getUrls } from "../../components/api/api";
import EpisodeCard from "../../components/EpisodeCard";
import * as routes from "../../constants/routes";

function makePromises(Urls=[]){
  return Urls.map((Url) =>getUrls(Url) )
}
class Character extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        // episode: null,
        id:null,
        epi: [],
       hasLoaded: false,
       hasError: false,
       errorMessage: null,
       images:null,
       origin:null, 
       location:null, 
       status:null, 
       species:null,
      };
    this.loadEpisodes = this.loadEpisodes.bind(this);
    }
  
    componentDidMount(){
     const{match} = this.props;
     const{caracterId}=match.params;
     
     console.log(match);
     console.log(caracterId);
     // const {episodeId} = match.params;
      this.loadEpisodes(caracterId)
      
    }
    
    async loadEpisodes(caracter) { 
    try{
     const {data}= await getCharacter(caracter);
     const {id,image,name, origin, location, status, species}= data;
     const LocationName=location.name;
     const originPlanet=origin.name;
     const episodesCall=await Promise.all(makePromises(data.episode))
     const dataEpisodes=episodesCall.map((episode) => episode.data)
     
     
      console.log(dataEpisodes);
      console.log(data);
     this.setState(
       {
          id:id,
          epi:dataEpisodes,
          hasLoaded:true,
          hasError:false,
          images:image,
          name: name,
          origin:originPlanet, 
          location:LocationName, 
          status:status, 
          species:species,
        }
     )
    }catch{
      this.setState({
        
        hasError:true
   })
    }
    }
  
render() {
    const { id,
            epi,
            hasLoaded,
            hasError,
            errorMessage,
            images,
            name,
            origin,
            location,
            status,
            species,
          } = this.state;
    return (
      <Layout>
        <section className="row">

        {hasLoaded && !hasError && (
          <>
            <div className="container">
              <div className="row">
                <img src={images} alt="car image"className="col" />
                <div className="col">
                  <h2>{name}</h2> 
                  <h4>{status}|{species}</h4>
                  <h4>ORIGIN</h4>
                  <h5>{origin} </h5>
                  <h4>LOCATION</h4>
                  <Link to={`${routes.LOCATION}/${id}`}>
                  <h5>{location} </h5>
                  </Link>
                </div>
              </div>
            </div>
            
            <h1>Episodes loaded!</h1>
          </>
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
          {epi.length >0 &&
           epi.map((char) => (
              <EpisodeCard
                key={char.id}
                id={char.id}
                name={char.name}
                airDate={char.air_date}
                episode={char.episode}
              /> 
            ))}
          </div>
        </section>
      </Layout>
    );
  }
}

export default Character;