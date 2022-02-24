import { React, Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import EpisodeCard from "../../components/EpisodeCard";
import CharacterCard from "../../components/CharacterCard";

class Character extends Component {
    constructor(props) {
        super(props);
        const { id } = props.match.params
        this.state = {
            characterId: id,
            character: null,
            episodes: [],
            hasLoaded: false,
        }
        this.loadCharacter = this.loadCharacter.bind(this)
    }

    async componentDidMount() {
        const { characterId } = this.state
        const characterData = await this.loadCharacter(characterId)
        this.setState(prevState => ({
            ...prevState,
            character: characterData,
            episodes: characterData.episode, // gives HATEOAS
            hasLoadedCharInfo: true

        }))
        const episodesArray = await this.loadEpisodes(characterData.episode)
        this.setState(prevState => ({
            ...prevState,
            episodes: episodesArray,
            hasLoadedEpisodes: true
        }))
    }

    async getEpisode(url) {
        console.log(this)
        const episode = await axios.get(url)
            .then(data => (
                data.data
            ))
        return episode
    }

    async loadCharacter(id) {
        console.log(this)
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(data => (
                data.data
            ))
        return response
    }

    async loadEpisodes(episodesURL) {
        const episodesArray = await axios.all(episodesURL.map((episode) => (
            this.getEpisode(episode)
        )))
            .then(data => (
                data
            ))

        return episodesArray;
    }

    render() {
        const { hasLoadedEpisodes, hasLoadedCharInfo, character, episodes } = this.state
        return (
            <section className="container mt-5">
                {!hasLoadedCharInfo &&
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                }
                <div className="row">
                    <div className="col col-12">
                        {hasLoadedCharInfo &&
                            <CharacterCard
                                infoCard
                                name={character.name}
                                image={character.image}
                                species={character.species}
                                status={character.status}
                                origin={character.origin.name}
                                location={character.location.name}
                            />}
                        <hr />
                        <h2>Episodes</h2>
                        <hr />
                        <div className="row">
                            {!hasLoadedEpisodes &&
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            }
                            {hasLoadedEpisodes &&


                                episodes.map((element) => (
                                    <EpisodeCard
                                        key={element.id}
                                        id={element.id}
                                        name={element.name}
                                        airDate={element.air_date}
                                        episode={element.episode}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div >


            </section>
        );
    }
}
export default withRouter(Character);