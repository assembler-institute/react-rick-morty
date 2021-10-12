import React, { Component } from "react";
import { fetchDataset, getLocation } from "../../api/requests";

import { ErrorMessageCard, NoResidentsCard } from "../../components/MessageCard";
import CharacterCard from "../../components/CharacterCard";
import CharacterGrid from "../../components/CharacterGrid";
import Divider from "../../components/Divider";
import Flex from "../../components/Flex";
import Layout from "../../components/Layout";
import SpinnerLoader from "../../components/SpinnerLoader";

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
		this.loadLocation();
	}

	componentDidUpdate(prevProps) {
		prevProps.id !== this.props.id && this.loadLocation();
	}

	loadLocation = async () => {
		try {
			const { id } = this.props;
			const { data: location, error } = await getLocation({ id });

			if (error) throw error;

			const { dataset: characters } = await fetchDataset(location.residents);

			this.setState((prevState) => ({
				...prevState,
				hasLoaded: true,
				location: location,
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
		const { hasLoaded, hasError, location, characters } = this.state;

		return (
			<Layout>
				{!hasLoaded && <SpinnerLoader />}
				{hasLoaded && hasError && <ErrorMessageCard />}
				{hasLoaded && !hasError && (
					<>
						<Flex justifyContent="space-between" alignItems="baseline">
							<h3>{location.name}</h3>
							<h6>
								{location.type} at {location.dimension}
							</h6>
						</Flex>
						<Divider />
						<h5>Resident characters</h5>
						<Divider thickness="1px" />
						{Boolean(characters.length) && (
							<CharacterGrid>
								{characters.map((character) => (
									<CharacterCard key={character.id} id={character.id} name={character.name} image={character.image} species={character.species} status={character.status} origin={character.origin} location={character.location} />
								))}
							</CharacterGrid>
						)}
						{Boolean(!characters.length) && <NoResidentsCard />}
					</>
				)}
			</Layout>
		);
	}
}
