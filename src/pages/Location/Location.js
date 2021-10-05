import React, { Component } from "react";
import axios from "axios";
import * as Routes from "../../constants/routes";
import Layout from "../../components/Layout";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // episode: null,
      location: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    await this.loadLocation();
  }

  async loadLocation() {
    const { match } = this.props;
    const num = match.params.locationId;
    try {
      const res = await axios.get(`${Routes.API}${Routes.LOCATION}/${num}`);
      this.setState({
        location: res.data,
        hasLoaded: true,
      });
    } catch (e) {
      this.setState({
        hasError: true,
        errorMessage: "Error, page not loaded",
      });
    }
  }

  render() {
    const { location, hasLoaded, hasError, errorMessage } = this.state;
    const json = JSON.stringify({ location });
    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <h1>LOCATION: {location.name}</h1>
            <hr />
            <div className="container">{json}</div>
          </section>
        )}
        {hasError && (
          <div className="col col-12">
            <h1>{errorMessage}</h1>
          </div>
        )}
      </Layout>
    );
  }
}

export default Location;
