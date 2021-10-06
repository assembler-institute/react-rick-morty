import axios from "axios";
import React, { Component } from "react";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

export default class Location extends React.Component {
    constructor(props) {
        super(props)
        this.setState({
            location: null,
            residents: [],
            hasLoaded: false
        })
    }

    getCharacter = async (locationId) => {
        const url = `https://rickandmortyapi.com/api/location/${locationId}`;
        const res = await axios.get(url);
        const location = res.data
        const residents = await axios.all(
            res.data.episode.map(async (urlList) => {
                const urlListResponse = await axios(urlList)
                return urlListResponse.data
            }))

        this.setState({
            location: location,
            residents: residents,
            hasLoaded: true
        })
    }

    render() {
        const { character, location, residents, hasLoaded } = this.state;
        const {
            match: { params },
        } = this.props;

        console.log(params.locationId)
        if (!hasLoaded) { this.getCharacter(params.locationId) }
    }

        render(){
            return (
                <Layout>
                    {hasLoaded && <div
                            name={location.name}
                            type={location.type}
                            dimension={location.dimension}
                        />}
                    {
                        hasLoaded && residents.map(e => {
                            return <CharacterCard
                                image={e.image}
                                name={e.name}
                                species={e.species}
                                status={e.status}
                                origin={e.origin}
                                location={e.location}
                            />
                        })}
                </Layout>
            )
        }
    }

