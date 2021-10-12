import React, { Component } from "react";
import { fetchDataset, getEpisode } from "../../api/requests";

import { ErrorMessageCard } from "../../components/MessageCard";
import CharacterCard from "../../components/CharacterCard";
import CharacterGrid from "../../components/CharacterGrid";
import Divider from "../../components/Divider";
import Flex from "../../components/Flex";
import SpinnerLoader from "../../components/SpinnerLoader";
import { withLayout } from "../../hocs";

class Episode extends Component {
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
			const { id } = this.props;
			const { data: episode, error } = await getEpisode({ id });

			if (error) throw error;

			const { dataset: characters } = await fetchDataset(episode.characters);

			this.setState((prevState) => ({
				...prevState,
				hasLoaded: true,
				episode: episode,
				characters: characters,
			}));
		} catch (error) {
			this.setState((prevState) => ({
				...prevState,
				hasLoaded: true,
				hasError: true,
				errorMessage: error.message,
			}));
		}
	};

	render() {
		const { hasLoaded, hasError, episode, characters } = this.state;

		return (
			<>
				{!hasLoaded && <SpinnerLoader />}
				{hasLoaded && hasError && <ErrorMessageCard />}
				{hasLoaded && !hasError && (
					<>
						<Flex justifyContent="space-between" alignItems="baseline">
							<h3>{episode.name}</h3>
							<h6>
								{episode.episode} | {episode.air_date}
							</h6>
						</Flex>
						<Divider />
						<h5>Characters that appeared</h5>
						<Divider thickness="1px" />
						<CharacterGrid>
							{characters.map((character) => (
								<CharacterCard key={character.id} id={character.id} name={character.name} image={character.image} species={character.species} status={character.status} origin={character.origin} location={character.location} />
							))}
						</CharacterGrid>
					</>
				)}
			</>
		);
	}
}

export default withLayout(Episode);
