import React, { Component } from "react";

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            hasLoaded: false,
            hasError: false,
            errorMessage: null,
        }
    }

    async componentDidMount() {
        try {
            // const { match } = this.props;
            // const { locationId } = match.params;
            const response = await getLocation(locationId);
            this.setState({
                location: response.data,
                hasLoaded: true,
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
        const { location, hasLoaded, hasError, errorMessage } = this.state;
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
                            <div className="col col-12">
                                <pre>
                                    <code>{JSON.stringify(location, null, 2)}</code>
                                </pre>
                            </div>
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
        )
    }
}