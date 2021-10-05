import React, { Component } from "react"; 
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
    page: 1,
    //loadedPage: 1,
    // paginationInfo: null,
    episodes: [],
    // hasLoaded: false,
    // hasError: false,
    // errorMessage: null,
  }}

  async componentDidMount() {
    this.loadEpisodes();
    const {page} = this.state;
    const url = `https://rickandmortyapi.com/api/episode?page=${page}`;
    try{
    const res = await axios.get(url);
    const newEpisodes = [] 
    res.data.results.map((e)=>newEpisodes.push(e));
    this.setState({
      episodes: newEpisodes,
    })
      
  } catch (err){
  }
  
  }

  async loadEpisodes() {
  //  console.log(this);
  }

  render() {
   const {episodes} = this.state;
    return (
      <Layout>
        <section className="row">
          {/* {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )} */}
          <div className="col col-12">
            <hr />
          </div>
          {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
          ))}
          <div className="col col-12">
            <hr />
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
