import axios from "axios";
import React, { Component } from "react";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import CharacterCard from "../../components/CharacterCard";

class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            character: undefined,
            episodes: [],
            hasLoaded: false
        }
    }
  
    getCharacter = async (characterId) =>{
        const url = `https://rickandmortyapi.com/api/character/${characterId}`;
        const res = await axios.get(url);
        
        const  character  = res.data
        const characterEpisodes = await axios.all(
            res.data.episode.map(async (urlList) => {
                const urlListResponse = await axios(urlList)
                return urlListResponse.data
            }))
           
        this.setState({
            episodes: characterEpisodes,
            character: character,
            hasLoaded:true
        })
    }

    render() {
        const { character, episodes, hasLoaded } = this.state;
        const {
            match: { params },
        } = this.props;

        console.log(params.characterId)
        if (!hasLoaded) {this.getCharacter(params.characterId)}
        
        return (
            <Layout>
                <section className="row">
                    <div className="col col-12">

                        {hasLoaded && <CharacterCard
                            key={character.id}
                            id={character.id}
                            name={character.name}
                            image={character.image}
                            species={character.species}
                            status={character.status}
                            origin={character.origin}
                            location={character.location}
                        />}
                        <div>
                            {
                                hasLoaded && episodes && episodes.map(e => {
                                    return <EpisodeCard
                                        key={e.id}
                                        id={e.id}
                                        name={e.name}
                                        airDate={e.air_date}
                                        episode={e.episode}
                                    />
                                })}
                        </div>

                    </div>
                </section>

            </Layout>

        )
    }
}

export default Character;