import React, { Component } from "react";
import { getEpisode } from "../../api/requests";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import SpinnerLoader from "../../components/SpinnerLoader";
import ErrorMessage from "../../components/ErrorMessage";
import Flex from "../../components/Flex";
import CharacterGrid from "../../components/CharacterGrid";
import Divider from "../../components/Divider";

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
				hasLoaded: true,
				hasError: true,
				errorMessage: error,
			}));
		}
	};

	render() {
		const { hasLoaded, hasError, episode, characters } = this.state;

		return (
			<Layout>
				{!hasLoaded && <SpinnerLoader />}
				{hasLoaded && hasError && <ErrorMessage />}
				{hasLoaded && !hasError && (
					<>
						<Flex justifyContent="space-between" alignItems="baseline">
							<h3>{episode.name}</h3>
							<h6>
								{episode.episode} | {episode.air_date}
							</h6>
						</Flex>
						<Divider />
						<CharacterGrid>
							{characters.map((character) => (
								<CharacterCard key={character.id} id={character.id} name={character.name} image={character.image} species={character.species} status={character.status} origin={character.origin} location={character.location} />
							))}
						</CharacterGrid>
					</>
				)}
			</Layout>
		);
	}
}
