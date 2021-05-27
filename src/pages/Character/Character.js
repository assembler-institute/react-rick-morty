import React, { Component } from "react";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

import { getCharacter, makePromises } from "../../api";

class Character extends Component {
    constructor(props) {
        super(props);

        this.state = {
            character: null,
            episodes: [],
            hasLoaded: false,
            hasError: false,
            errorMessage: null,
        }

        this.loadCharacter = this.loadCharacter.bind(this);
    }

    componentDidMount() {
        const { match } = this.props;
        const { characterId } = match.params;

        this.loadCharacter(characterId);
    }

    async loadCharacter(characterId) {
        try {
            const { data } = await getCharacter(characterId);
            const episodeResponse = await Promise.all(makePromises(data.episode));
            const episodes = episodeResponse.map((episode) => episode.data);
            // console.log({ data });
            // console.log({ episodeResponse });
            // console.log({ episodes });

            this.setState({
                character: data,
                episodes: episodes,
                hasLoaded: true,
                hasError: false,
            });

        } catch (error) {
            this.setState({
                hasLoaded: true,
                hasError: true,
                errorMessage: error.message
            });
        }
    }

    render() {
        const {
            character,
            episodes,
            hasLoaded,
            hasError,
            errorMessage } = this.state;
        return (
            <Layout>
                <section className="row">
                    {!hasLoaded && (
                        <div className="col col-12">
                            <p>Character loading...</p>
                        </div>
                    )}
                    {hasLoaded && (
                        <div className="col col-12">
                            <p>Character loaded!</p>
                        </div>
                    )}
                    {hasError && (
                        <div className="col col-12">
                            <p>Character error...</p>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <div className="col col-12">
                        <hr />
                    </div>
                    {!hasError && hasLoaded && (
                        <div className="col col-4 col-sm-4 col-xl-3">
                            <img className="CharacterCard__img" src={character.image} alt="" />
                        </div>
                    )}
                    {!hasError && hasLoaded && (
                        <div className="col">
                            <h1>{character.name}</h1>
                            <hr />
                            <h5>CHARACTER</h5>
                            <p>{character.species} | {character.status}</p>
                            <h5>ORIGIN</h5>
                            <p>{character.origin.name}</p>
                            <h5>LOCATION</h5>
                            <p>{character.location.name}</p>
                        </div>
                    )}
                    <div className="col col-12">
                        <hr />
                    </div>
                    <div className="col col-12">
                        <h3>Episodes</h3>
                    </div>
                    <div className="col col-12">
                        <hr />
                    </div>
                    
                    {episodes.length > 0 &&
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
                        <hr />
                    </div>
                </section>
            </Layout>
        );
    }
}

export default Character;
