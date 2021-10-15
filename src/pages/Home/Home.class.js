import React, { Component } from "react";
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

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			paginationInfo: null,
			episodes: [],
			hasLoaded: false,
			hasError: false,
			errorMessage: null,
		};
	}

	componentDidMount() {
		this.loadEpisodes();
	}

	componentDidUpdate(prevProps) {
		prevProps.page !== this.props.page && this.loadEpisodes();
	}

	loadEpisodes = async () => {
		try {
			const { page } = this.props;
			const { data, error } = await getEpisodes({ page });

			if (error) throw error;

			this.setState((prevState) => ({
				...prevState,
				hasLoaded: true,
				episodes: data.results,
				paginationInfo: data.info,
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
		const { page } = this.props;
		const { hasLoaded, hasError, episodes, paginationInfo } = this.state;

		return (
			<>
				<Title>Episodes</Title>
				{!hasLoaded && <SpinnerLoader />}
				{hasLoaded && hasError && <ErrorMessageCard />}
				{hasLoaded && !hasError && (
					<>
						<Divider />
						<EpisodeGrid>
							{episodes.map((episode) => (
								<EpisodeCard key={episode.id} id={episode.id} name={episode.name} airDate={episode.air_date} episode={episode.episode} />
							))}
						</EpisodeGrid>
						<Divider />
						<Flex gap="1rem">
							<ButtonLink $light to={Boolean(paginationInfo.prev) ? `/${Number(page) - 1}` : `/${Number(page)}`} disabled={!Boolean(paginationInfo.prev)}>
								Previous
							</ButtonLink>
							<ButtonLink $light to={Boolean(paginationInfo.next) ? `/${Number(page) + 1}` : `/${Number(page)}`} disabled={!Boolean(paginationInfo.next)}>
								Next
							</ButtonLink>
						</Flex>
					</>
				)}
			</>
		);
	}
}

export default withLayout(Home);
