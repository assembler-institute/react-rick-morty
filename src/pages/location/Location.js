import { React, Component } from "react";
import { withRouter } from "react-router-dom";
import { axios } from "axios"
import "./location.scss"

class Location extends Component {
    constructor(props) {
        super(props)
        const { id } = props.match.params
        this.state = {
            id: id
        }
    }

    didComponentMount() {
        console.log(this)
        this.loadLocation()
    }

    loadLocation(id) {
        console.log(this)
        return axios.get(`https://rickandmortyapi.com/api/location/1${id}`)
    }

    render() {
        return (
            <h1>Location:</h1>

        )
    }
}

export default withRouter(Location)