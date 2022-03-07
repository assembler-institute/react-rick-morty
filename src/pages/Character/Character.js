import { React, Component } from "react";
import EpisodeCard from "../../components/EpisodeCard";
import CharacterCard from "../../components/CharacterCard";
import WithDataClass from "../../HOC/WithData";
import Layout from "../../components/Layout";

class Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: props.character,
            episodes: props.episodes,
            hasLoadedCharInfo: props.hasLoadedCharInfo,
            hasLoadedEpisodes: props.hasLoadedEpisodes,
        }

    }



    render() {
        const { hasLoadedEpisodes, hasLoadedCharInfo, character, episodes } = this.state
        return (
            <Layout>
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
            </Layout>
        );
    }
}
export default WithDataClass(Character);