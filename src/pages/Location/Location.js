import React, { Component } from "react";

import Layout from "../../components/Layout";

import { getLocation } from "../../api";

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
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

      this.setState({
        hasLoaded: true,
        location: data,
      });
    } catch (e) {
      this.setState({
        hasLoaded: true,
        hasError: true,
        errorMessage: e.message,
      });
    }
  }

  render() {
    const { location, hasLoaded, hasError, errorMessage } = this.state;
    return (
      <Layout>
        <section className="row">
          {!hasLoaded && (
            <div className="col col-12">
              <p>Location not loaded...</p>
            </div>
          )}
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h5>
                Location:
                <span className="text-danger">{` ${location.name}`}</span>
              </h5>
              <hr />
              <pre>{`${JSON.stringify(location, null, 2)}`}</pre>
              <hr />
            </div>
          )}

          {hasError && (
            <div className="col col-12">
              <p>Location error...</p>
              <p>{errorMessage}</p>
            </div>
          )}
        </section>
      </Layout>
    );
  }
}

export default Location;
