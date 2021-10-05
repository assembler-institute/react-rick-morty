import axios from "axios";
import React, { Component } from "react";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/CharacterCard";
import CharacterCard from "../../components/CharacterCard";

class Character extends React.Component {
    constructor(props) {
        super(props);
         this.state={
               character: null,
               episodes: []     
       }
    }
    componentDidMount() {
        console.log("inside");
        const {
            match: { params },
          } = this.props;

          this.getCharacter(params.id)
        }
        async getCharacter(characterId) {
            const url = `https://rickandmortyapi.com/api/character/${characterId}`;
            const res = await axios.get(url);
            const characterEpisodes = res.data.episode
            console.log(res);
            const characterEpisodesList = [...this.state.episodes, characterEpisodes]            
            const characterRes = await axios.all(
                episode.character.map(async (urlList) => {
                    const urlListResponse = await axios(urlList)
                    return urlListResponse.data
                }))
                this.setState({
                    character: res.data.id,
                    episodes: characterEpisodesList
                })
        }

    render() {
        return (
            <>
                <div>
                    
                </div>                
            </>
        )
    }
}

export default Character;