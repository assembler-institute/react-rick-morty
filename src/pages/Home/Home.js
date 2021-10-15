import React, { useEffect } from "react";
import { useFetch } from "../../hooks";
import { getEpisodes } from "../../api/requests";

import { ButtonLink } from "../../components/Button";
import { ErrorMessageCard } from "../../components/MessageCard";
import Divider from "../../components/Divider";
import EpisodeCard from "../../components/EpisodeCard";
import EpisodeGrid from "../../components/EpisodeGrid";
import Flex from "../../components/Flex";
import SpinnerLoader from "../../components/SpinnerLoader";
import withLayout from "../../hocs/withLayout";

import styled from "styled-components";

const Title = styled.h1`
	font-size: 2.5rem;
	text-align: center;
`;

function Home(props) {
	const { page } = props;
	const [{ hasLoaded, hasFailed, data, errorMsg }, fetchDispatch] = useFetch();

	useEffect(() => {
		(async () => {
			try {
				const { data, error } = await getEpisodes({ page });

				if (error) throw error;

				fetchDispatch({
					type: "successful",
					data: {
						info: data.info,
						episodes: data.results,
					},
				});
			} catch (error) {
				fetchDispatch({
					type: "failed",
					errorMsg: "Something went wrong",
				});
			}
		})();
	}, [page, fetchDispatch]);

	return (
		<>
			<Title>Episodes</Title>
			{!hasLoaded && <SpinnerLoader />}
			{hasLoaded && hasFailed && <ErrorMessageCard message={errorMsg} />}
			{hasLoaded && !hasFailed && (
				<>
					<Divider />
					<EpisodeGrid>
						{data.episodes.map((episode) => (
							<EpisodeCard key={episode.id} id={episode.id} name={episode.name} airDate={episode.air_date} episode={episode.episode} />
						))}
					</EpisodeGrid>
					<Divider />
					<Flex gap="1rem">
						<ButtonLink $light to={Boolean(data.info.prev) ? `/${Number(page) - 1}` : `/${Number(page)}`} disabled={!Boolean(data.info.prev)}>
							Previous
						</ButtonLink>
						<ButtonLink $light to={Boolean(data.info.next) ? `/${Number(page) + 1}` : `/${Number(page)}`} disabled={!Boolean(data.info.next)}>
							Next
						</ButtonLink>
					</Flex>
				</>
			)}
		</>
	);
}

export default withLayout(Home);
