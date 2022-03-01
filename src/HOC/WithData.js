import { React, useState, useEffect } from "react";
import axios from "axios";

const WithData = (WrappedComponent) => {
    function FetchingData({ match }) {
        const { id } = match.params

        const [dataState, setDataState] = useState({
            episodes: [],
            characterInfo: [],
            hasLoaded: false,

        })
        useEffect(() => {
            const result = async () => {
                const characterInfo = await loadCharacter(id);
                const episodes = await loadEpisodes(characterInfo.episode);
                setDataState({
                    ...dataState,
                    episodes: episodes,
                    characterInfo: characterInfo,
                    hasLoaded: true
                })
            }
            result()
        }, [])

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


        const { hasLoaded, episodes, characterInfo } = dataState;
        console.log(episodes)
        return (
            <>
                {hasLoaded &&
                    <WrappedComponent character={characterInfo} episodes={episodes} hasLoadedCharInfo hasLoadedEpisodes />
                }
                dasdkasdkaskdaskdaksdkasd
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </>
        )
    }
    return FetchingData
}
export default WithData