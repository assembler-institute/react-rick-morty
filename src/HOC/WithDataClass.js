import { React, Component } from "react";
import axios from "axios";

async function getEpisode(url) {
    const episode = await axios.get(url)
        .then(data => (
            data.data
        ))
    return episode
}

async function loadCharacter(idChar) {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${idChar}`)
        .then(data => (
            data.data
        ))
    return response
}

async function loadEpisodes(episodesURL) {
    const episodesArray = await axios.all(episodesURL.map((episode) => (
        getEpisode(episode)
    )))
        .then(data => (
            data
        ))

    return episodesArray;
}
const WithDataClass = (WrappedComponent) => {

    return class FetchingData extends Component {
        constructor(props) {
            super(props)
            const { id } = props.match.params
            this.state = {
                id: id,
                episodes: [],
                characterInfo: [],
                hasLoaded: false,
            }
        }

        async componentDidMount() {
            const { id } = this.state;
            const characterInfo = await loadCharacter(id);
            const episodes = await loadEpisodes(characterInfo.episode)
            this.setState((prevState) => ({
                ...prevState,
                episodes: episodes,
                characterInfo: characterInfo,
                hasLoaded: true
            }))
        }


        render() {
            const { hasLoaded, characterInfo, episodes } = this.state;
            return (
                <>
                    {hasLoaded &&
                        <WrappedComponent character={characterInfo} episodes={episodes} hasLoadedCharInfo hasLoadedEpisodes />
                    }
                </>
            )
        }
    }
}
export default WithDataClass