import React, { Component } from "react";
import { getCharacter, getEpisode } from "../../utils/axios";
import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import axios from "axios";
class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: {},
            episode: [],
            hasLoaded: false,
            hasError: false,
            errorMessage: null,
        };
    }
    async componentDidMount() {
        const {
            match: { params },
        } = this.props;

        this.loadCharacter(params.characterId);
    }
    async loadCharacter(characterId) {
        try {
            const response = await getCharacter(characterId);
            const res = await axios.all(
                response.data.episode.map(async (cUrl) => {
                    const response = await axios(cUrl);
                    return response.data;
                }),
            );
            this.setState({
                character: {
                    id: response.data.id,
                    name: response.data.name,
                    image: response.data.image,
                    species: response.data.species,
                    status: response.data.status,
                    origin: response.data.origin,
                    location: response.data.location,
                },
                episode: res,
                hasLoaded: true,
            });
        } catch (error) {
            this.setState({
                errorMessage: error.message,
                hasLoaded: false,
                hasError: false,
            });
        }
    }
    render() {
        const { character, episode, hasLoaded, hasError, errorMessage } = this.state;
        return (
            <>
                <Layout>
                    {hasLoaded && !hasError && (
                        <section className="row">
                            <div className="col col-4">
                                <img className="h3 Character__img" src={character.image} alt="" />
                            </div>
                            <div className="col col-8 d-flex align-items-center">
                                <div className="row">
                                    <div className="col col-12">
                                        <h1 className="h3">{character.name}</h1>
                                    </div>
                                    <div className="col col-12">
                                        <hr />
                                    </div>
                                    <div className="col col-12">
                                        <div className="d-flex flex-column mb-4">
                                            <p className="mb-0 mr-2 text-uppercase font-weight-bold">
                                                Character
                                            </p>
                                            <div className="d-flex">
                                                <p className="mb-0 mr-2">{character.species}</p>
                                                <p className="mb-0 mr-2">|</p>
                                                <p className="mb-0">{character.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col-12">
                                        <div className="d-flex">
                                            <div className="d-flex flex-column mr-4">
                                                <p className="mb-0 mr-2 text-uppercase font-weight-bold">
                                                    Origin
                                                </p>
                                                <p className="mb-0">{character.origin.name}</p>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <p className="mb-0 mr-2 text-uppercase font-weight-bold">
                                                    Location
                                                </p>
                                                <p className="mb-0">{character.location.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-12">
                                <hr />
                            </div>
                            <div className="col col-12">
                                <h2 className="h5">Episodes</h2>
                            </div>
                            <div className="col col-12">
                                <hr />
                            </div>
                            {episode.length > 0 &&
                                episode.map((episode) => (
                                    <EpisodeCard
                                        key={episode.id}
                                        id={episode.id}
                                        name={episode.name}
                                        airDate={episode.air_date}
                                        episode={episode.episode}
                                    />
                                ))}
                        </section>
                    )}
                    {!hasLoaded && (
                        <section className="row">
                            <div className="col col-12">
                                <h1 className="h3">Loading data...</h1>
                            </div>
                        </section>
                    )}
                    {hasError && (
                        <section className="row">
                            <div className="col col-12">
                                <h1>Something went wrong...</h1>
                                <p>{errorMessage}</p>
                            </div>
                        </section>
                    )}
                </Layout>
            </>
        );
    }
}
export default Character;
