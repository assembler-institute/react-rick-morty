import { React, Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./location.scss"
import Layout from "../../components/Layout";

class Location extends Component {
    constructor(props) {
        super(props)
        const { id } = props.match.params
        this.state = {
            id: id,
            location: null,
            hasLoaded: false,
        }
    }

    async componentDidMount() {
        const { id } = this.state
        const location = await this.loadLocation(id)
        this.setState(prevState => ({
            ...prevState,
            location: location,
            hasLoaded: true
        }))
    }

    async loadLocation(id) {
        console.log(this)
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`)
            .then(data => (
                data.data
            ))
        return response;
    }

    render() {
        const { location, hasLoaded } = this.state
        return (
            <Layout>
                <section className="container">
                    {hasLoaded &&
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