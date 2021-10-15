import React, { useEffect } from "react";
import { useFetch } from "../../hooks";
import { fetchDataset, getEpisode } from "../../api/requests";

import { ErrorMessageCard } from "../../components/MessageCard";
import CharacterCard from "../../components/CharacterCard";
import CharacterGrid from "../../components/CharacterGrid";
import Divider from "../../components/Divider";
import Flex from "../../components/Flex";
import SpinnerLoader from "../../components/SpinnerLoader";
import { withLayout } from "../../hocs";

function Episode(props) {
	const { id } = props;
	const [{ hasLoaded, hasFailed, data, errorMsg }, fetchDispatch] = useFetch();

	useEffect(() => {
		(async () => {
			try {
				const { data: episode, error: errorEpisode } = await getEpisode({ id });

				if (errorEpisode) throw errorEpisode;

				const { dataset: characters } = await fetchDataset(episode.characters);

				fetchDispatch({
					type: "successful",
					data: {
						episode,
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
						<h3>{data.episode.name}</h3>
						<h6>
							{data.episode.episode} | {data.episode.air_date}
						</h6>
					</Flex>
					<Divider />
					<h5>Characters that appeared</h5>
					<Divider thickness="1px" />
					<CharacterGrid>
						{data.characters.map((character) => (
							<CharacterCard key={character.id} id={character.id} name={character.name} image={character.image} species={character.species} status={character.status} origin={character.origin} location={character.location} />
						))}
					</CharacterGrid>
				</>
			)}
		</>
	);
}

export default withLayout(Episode);
