import React, { Component } from "react";
// import { getEpisode, getCharacters } from "../../components/api/api";
import Layout from "../../components/Layout";
import { getUrls, getLocation } from "../../components/api/api";
import CharacterCard from "../../components/CharacterCard";

function makePromises(Urls=[]){
    return Urls.map((Url) =>getUrls(Url) )
  }

class Location extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
       residents:[],
       location:null,
       hasLoaded: false,
       hasError: false,
       errorMessage: null,
      };
     this.loadEpisodes = this.loadEpisodes.bind(this);
    }

    componentDidMount(){
        const{match} = this.props;
        const {locationId} = match.params;
        
        console.log(match);
        console.log(locationId);
        this.loadEpisodes(locationId)
        }
       
     componentDidUpdate(){

        console.log(this.state) 
     }

    async loadEpisodes(location) { 
        try{
        const {data}= await getLocation(location);
        const { name, type,dimension } = data;
        const residentsCall=await Promise.all(makePromises(data.residents))
        const dataResident=residentsCall.map((resident) => resident.data)
        console.log(name);
        console.log(type);
        console.log(dimension);
        console.log(data);
         this.setState({
            residents:dataResident,
            location:data,
            hasLoaded: true,
            
             })
        }catch{
            this.setState({
                
                hasError: true,
                 })
        }
    }

render() {
    const { location,
            residents,
            hasLoaded,
            hasError,
            errorMessage
          } = this.state;
    return (
      <Layout>
        <section className="row">
        {hasLoaded && !hasError && (
            <div className="col col-12">
                <h2>{location.name}</h2>
                <h2>{location.type}</h2>
                <h2>{location.dimension}</h2>
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
             
          {residents.map((resident) => (
              <CharacterCard
                key={resident.id}
                id={resident.id}
                name={resident.name}
                image={resident.image}
                species={resident.species}
                status={resident.status}
                origin={resident.origin}
                location={resident.location}
                // locationN={locationN}
                // locationD={locationD}
                // locationT={locationT}
              />
            ))}
             
          </div>
        </section>
      </Layout>
    );
  }
}

export default Location;