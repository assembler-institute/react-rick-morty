import React, { useEffect } from "react";
import { withLayout } from "../../hocs";
import { useFetch } from "../../hooks";
import { fetchDataset, getLocation } from "../../api/requests";

import { ErrorMessageCard, NoResidentsCard } from "../../components/MessageCard";
import CharacterCard from "../../components/CharacterCard";
import CharacterGrid from "../../components/CharacterGrid";
import Divider from "../../components/Divider";
import Flex from "../../components/Flex";
import SpinnerLoader from "../../components/SpinnerLoader";

function Location(props) {
	const { id } = props;
	const [{ hasLoaded, hasFailed, data, errorMsg }, fetchDispatch] = useFetch();

	useEffect(() => {
		(async () => {
			try {
				const { data: location, error: errorLocation } = await getLocation({ id });

				if (errorLocation) throw errorLocation;

				const { dataset: characters } = await fetchDataset(location.residents);

				fetchDispatch({
					type: "successful",
					data: {
						location,
						characters,
					},
				});
			} catch (error) {
				fetchDispatch({
					type: "failed",
					errorMsg: "Something went wrong",
				});
			}
		})();
	}, [id, fetchDispatch]);

	return (
		<>
			{!hasLoaded && <SpinnerLoader />}
			{hasLoaded && hasFailed && <ErrorMessageCard message={errorMsg} />}
			{hasLoaded && !hasFailed && (
				<>
					<Flex justifyContent="space-between" alignItems="baseline">
						<h3>{data.location.name}</h3>
						<h6>
							{data.location.type} at {data.location.dimension}
						</h6>
					</Flex>
					<Divider />
					<h5>Resident characters</h5>
					<Divider thickness="1px" />
					{Boolean(data.characters.length) && (
						<CharacterGrid>
							{data.characters.map((character) => (
								<CharacterCard key={character.id} id={character.id} name={character.name} image={character.image} species={character.species} status={character.status} origin={character.origin} location={character.location} />
							))}
						</CharacterGrid>
					)}
					{Boolean(!data.characters.length) && <NoResidentsCard />}
				</>
			)}
		</>
	);
}

export default withLayout(Location);
