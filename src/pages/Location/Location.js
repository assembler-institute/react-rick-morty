import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

import {getLocation, makePromises} from "../../api";

class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: null,
            residents: [],
            hasLoaded: false,
            hasError: false,
            errorMessage: null,
        }

        this.loadLocation = this.loadLocation.bind(this);
    }

    componentDidMount() {
        const { match } = this.props;
        const { locationId } = match.params;

        this.loadLocation(locationId);
    }

    async loadLocation(locationId) {
        try {
            const { data } = await getLocation(locationId);
            const residentsResponse = await Promise.all(makePromises(data.residents));
            const residents = residentsResponse.map((resident) => resident.data);
            // console.log({data})
            // console.log({residentsResponse})
            // console.log({residents})

            this.setState({
                location: data,
                residents: residents,
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
            location,
            residents,
            hasLoaded,
            hasError,
            errorMessage
        } = this.state;
        return (
            <Layout>
                <section className="row">
                    {!hasLoaded && (
                        <div className="col col-12">
                            <p>Location loading...</p>
                        </div>
                    )}
                    {hasLoaded && (
                        <div className="col col-12">
                            <p>Location loaded!</p>
                        </div>
                    )}
                    {hasError && (
                        <div className="col col-12">
                            <p>Location error...</p>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <hr />
                    {!hasError && hasLoaded && (
                        <div className="col col-12">
                            <h1>{location.name}</h1>
                            <hr />
                            <h5>TYPE</h5>
                            <p>{location.type}</p>
                            <h5>DIMENSION</h5>
                            <p>{location.dimension}</p>
                        </div>
                    )}
                    <div className="col col-12">
                        <hr />
                    </div>
                    <div className="col col-12">
                        <h3>Residents</h3>
                    </div>
                    <div className="col col-12">
                        <hr />
                    </div>
                    {residents.length > 0 &&
                        residents.map((resident) => (
                            <CharacterCard
                                key={resident.id}
                                id={resident.id}
                                name={resident.name}
                                image={resident.image}
                                species={resident.species}
                                status={resident.status}
                                origin={resident.origin}
                                location={resident.location}
                            />
                        ))}
                </section>
            </Layout>
        )
    }
}

export default Location;
