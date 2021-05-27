import React, { Component } from "react";

import { getLocation } from "../../api";

import Layout from "../../components/Layout";

function makePromises(urls = []) {
  const myArray = urls.map((url) => getLocation(url));
  // console.log(myArray);
  return myArray;
}

class LocationPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			location: "",
			name: "",
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
		};
		this.loadLocation = this.loadLocation.bind(this);
	}

	componentDidMount() {
    // console.log(this);

    const { match } = this.props;
    const { locationId } = match.params;

    console.log(locationId);
    this.loadLocation(locationId);
  }

	async loadLocation(locationId) {
		// console.log(this);
		try{

			const { data } = await getLocation(locationId);
			console.log(data);

			this.setState({
        location: data,
				name: data.name,
      });

		} catch (error){
			this.setState({
        hasLoaded: false,
        hasError: true,
        errorMessage: error.message,
      });
		}
	}

	render(){
		const {errorMessage, hasError, hasLoaded, location, name} = this.state;

		return (
			<Layout>
				  {hasLoaded && (
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
					<div className="row">
						<h4>LOCATION: {name} </h4>
					</div>
						<hr />
					<div className="col col-12">
						{JSON.stringify(location, null, 1)}
          </div>
			</Layout>
		)
	}
}

export default LocationPage;