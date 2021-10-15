import React, { useEffect } from "react";
import { useFetch } from "../../hooks";
import { fetchDataset, getCharacter } from "../../api/requests";

import { ErrorMessageCard } from "../../components/MessageCard";
import CharacterProfile from "../../components/CharacterProfile";
import Divider from "../../components/Divider";
import EpisodeCard from "../../components/EpisodeCard";
import EpisodeGrid from "../../components/EpisodeGrid";
import SpinnerLoader from "../../components/SpinnerLoader";
import { withLayout } from "../../hocs";

function Character(props) {
	const { id } = props;
	const [{ hasLoaded, hasFailed, data, errorMsg }, fetchDispatch] = useFetch();

	useEffect(() => {
		(async () => {
			try {
				const { data: character, error: errorCharacter } = await getCharacter({ id });
				console.log(character);
				if (errorCharacter) throw errorCharacter;

				const { dataset: episodes } = await fetchDataset(character.episode);

				fetchDispatch({
					type: "successful",
					data: {
						character,
						episodes,
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
					{<CharacterProfile {...data.character} />}

					<Divider />
					<h5>Episodes</h5>
					<Divider thickness="1px" />
					<EpisodeGrid>
						{data.episodes.map((episode) => (
							<EpisodeCard key={episode.id} id={episode.id} name={episode.name} airDate={episode.air_date} episode={episode.episode} />
						))}
					</EpisodeGrid>
				</>
			)}
		</>
	);
}

export default withLayout(Character);
