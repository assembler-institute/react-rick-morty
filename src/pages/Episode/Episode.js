import React, { Component } from "react";
import { getEpisode } from "../../api/requests";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

export default class Episode extends Component {
	constructor(props) {
		super(props);

		this.state = {
			episode: null,
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
		prevProps.id !== this.props.id && this.loadEpisode();
	}

	loadEpisode = async () => {
		try {
			const data = await getEpisode({
				episode: this.props.id,
			});

			this.setState((prevState) => ({
				...prevState,
				hasLoaded: true,
				episode: data.episode,
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
		const { hasLoaded, hasError, episode, characters } = this.state;

		return (
			<Layout>
				<section className="row">
					{hasLoaded && !hasError && (
						<>
							<div className="col col-12">
								<h3>{episode.name}</h3>
							</div>
							<div className="col col-12">
								<hr />
							</div>
							<div className="col col-12">
								<h6>
									{episode.episode} | {episode.air_date}
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
