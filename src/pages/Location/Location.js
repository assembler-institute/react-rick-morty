import React, { Component } from "react";
import Layout from "../../components/Layout";
import { getLocation } from "../../utils/axios";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard";
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            hasLoaded: false,
            residents: {},
            hasError: false,
            errorMessage: null,
        };
    }
    async componentDidMount() {
        try {
            const { match } = this.props;
            const { locationId } = match.params;
            const responseLocation = await getLocation(locationId);
            const res = await axios.all(
                responseLocation.data.residents.map(async (cUrl) => {
                    const response = await axios(cUrl);
                    return response.data;
                }),
            );
            const item = res.forEach(el => console.log(el.name))
            this.setState({
                location: responseLocation.data,
                hasLoaded: true,
                residents: res,
            });
        } catch (error) {
            this.setState({
                errorMessage: error.message,
                hasLoaded: true,
                hasError: true,
            });
        }
    }
    render() {
        const {
            location,
            hasLoaded,
            hasError,
            errorMessage,
            residents,
        } = this.state;
        return (
            <>
                <Layout>
                    {hasLoaded && !hasError && (
                        <section className="row">
                            <div className="col col-12">
                                <h1 className="h3">
                                    Location:{" "}
                                    <code className="font-weight-bold">{location.name}</code>
                                </h1>
                            </div>
                            <div className="col col-12">
                                <hr />
                            </div>
                            <div className="col col-12 m-lg-5" >
                                <h3 className="h3">{location.dimension}</h3>
                            </div>
                                {residents.length > 0 &&
                                    residents.map((character) => (
                                        <CharacterCard
                                            key={character.id}
                                            id={character.id}
                                            name={character.name}
                                            image={character.image}
                                            species={character.species}
                                            status={character.status}
                                            origin={character.origin}
                                            location={character.location}
                                        />
                                    ))}
                           
                            <div className="col col-12">
                                <hr />
                            </div>
                            <div className="col col-12"></div>
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
export default Location;
