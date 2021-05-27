import React, { Component } from "react";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import { getEpisodesP } from "../../components/api/api";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      paginationInfo: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: "You do shit",
    };
    this.loadNextPage=this.loadNextPage.bind(this)
  }

   componentDidMount() {
    const {page}=this.state
    this.loadEpisodes(page);
  }
  
  componentDidUpdate(_prevProps, prevState){
    const {page: prevPage} = prevState;
    const {page} = this.state;
    console.log({prevPage})
    console.log({page})
    if(prevPage !== page){
      this.loadEpisodes(page);
    }
  }
  
  async loadEpisodes(page) { 
    try{
    const {data} = await getEpisodesP(page);
    const {results,info} = data;
   
    console.log(data)
    this.setState((prevState)=>({
      paginationInfo:info,
      episodes:[...prevState.episodes,...results],
      hasLoaded:true,
    }))
  }catch{
    this.setState({
      hasError:true,
    })
  }
  }
  
  loadNextPage(){
    this.setState((prevState)=>({
      page:prevState.page +1,
    }))
  }

  render() {
      const{
        paginationInfo,
        hasLoaded,
        hasError,
        episodes,
        errorMessage
      }=this.state;
      
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
           {episodes.length >0 &&
           episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              /> 
            ))}
          <div className="col col-12">
            <button className="btn btn-primary" type="button" disabled={paginationInfo && !paginationInfo.next} onClick={this.loadNextPage}>next page</button>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
