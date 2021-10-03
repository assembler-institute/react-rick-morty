import React, { Component } from "react";
import { getLocation } from "../../api/requests";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

export default class Location extends Component {
	constructor(props) {
		super(props);

		this.state = {
			location: null,
			characters: [],
			hasLoaded: false,
			hasError: false,
			errorMessage: null,
		};
	}

	componentDidMount() {
		this.loadEpisode();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.id !== this.props.id) this.loadEpisode();
	}

	loadEpisode = async () => {
		try {
			const data = await getLocation({
				location: this.props.id,
			});

			this.setState((prevState) => ({
				...prevState,
				hasLoaded: true,
				location: data.location,
				characters: data.characters,
			}));
		} catch (error) {
			this.setState((prevState) => ({
				...prevState,
				hasError: true,
				errorMessage: error,
			}));
		}
	};

	render() {
		const { hasLoaded, hasError, location, characters } = this.state;

		return (
			<Layout>
				<section className="row">
					{hasLoaded && !hasError && (
						<>
							<div className="col col-12">
								<h3>{location.name}</h3>
							</div>
							<div className="col col-12">
								<hr />
							</div>
							<div className="col col-12">
								<h6>
									{location.type} | {location.dimension}
								</h6>
							</div>
							<div className="col col-12">
								<hr />
							</div>
							<div className="col col-12 row">
								{characters.map((character) => (
									<CharacterCard key={character.id} id={character.id} name={character.name} image={character.image} species={character.species} status={character.status} origin={character.origin} location={character.location} />
								))}
							</div>
						</>
					)}
				</section>
			</Layout>
		);
	}
}
