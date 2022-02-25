import { React, Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./location.scss"
import Layout from "../../components/Layout";

async function getLocationURL(id) {
    const URL = `https://rickandmortyapi.com/api/character/${id}`
    const response =
        await axios
            .get(URL)
            .then(data => {
                const { url } = data.data.location
                return url
            })
    return response
}

async function loadLocation(URL) {
    const response = await axios.get(URL)
        .then(data => (
            data.data
        ))
        .catch(error => {
            return false
        })
    return response;
}

class Location extends Component {
    constructor(props) {
        super(props)
        const { id } = props.match.params
        this.state = {
            idCharacter: id,
            location: null,
            hasLoaded: false,
            hasError: false,
        }
    }

    async componentDidMount() {
        const { idCharacter } = this.state
        const locationURL = await getLocationURL(idCharacter)
        const location = await loadLocation(locationURL)
        if (!location) {
            this.setState(prevState => ({
                ...prevState,
                hasError: true,
                hasLoaded: true,
            }))
            return;
        }
        this.setState(prevState => ({
            ...prevState,
            location: location,
            hasLoaded: true
        }))
    }


    render() {
        const { location, hasLoaded, hasError } = this.state
        return (
            <Layout>
                <section className="container">

                    {!hasLoaded &&
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>

                    }
                    {hasError && hasLoaded && <h3 className="pinkText">Failed to load</h3>}
                    {hasLoaded && !hasError &&
                        <>
                            <h3 >Location:<span className="pinkText">{location.name}</span></h3>
                            <hr />
                            <pre>{JSON.stringify(location, null, 2)}</pre>
                        </>
                    }
                </section>
            </Layout>

        )
    }
}

export default withRouter(Location)