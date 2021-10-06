import React, { Component } from "react";
import { getEpisodes } from "../../api/requests";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import SpinnerLoader from "../../components/SpinnerLoader";
import ErrorMessage from "../../components/ErrorMessage";
import { Redirect } from "react-router-dom";
import Button from "../../components/Button";
import styled from "styled-components";

const Title = styled.h1`
	font-size: 2.5rem;
	text-align: center;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-template-rows: auto;
	justify-items: center;

	padding: 1rem;
	gap: 0 2rem;

	@media screen and (min-width: ${(props) => props.theme.breakpoints.sm}) {
		grid-template-columns: repeat(2, 1fr);
		justify-items: flex-start;
	}

	@media screen and (min-width: ${(props) => props.theme.breakpoints.lg}) {
		grid-template-columns: repeat(3, 1fr);
		justify-items: flex-start;
	}
`;

const Divider = styled.hr`
	height: 2px;

	border-radius: 2px;
	background-color: ${(props) => props.theme.palette.dark.contrast};
`;

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirectPrevPage: false,
			redirectNextPage: false,
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

	goPrevPage = () => {
		const { page } = this.props;

		page !== "1" &&
			this.setState((prevState) => ({
				...prevState,
				redirectPrevPage: true,
			}));
	};

	goNextPage = () => {
		const { paginationInfo } = this.state;
		const { page } = this.props;

		Boolean(paginationInfo.next) &&
			page !== "1" &&
			this.setState((prevState) => ({
				...prevState,
				redirectNextPage: true,
			}));
	};

	loadEpisodes = async () => {
		try {
			const data = await getEpisodes({
				page: this.props.page,
			});

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
		const { hasLoaded, hasError, episodes, paginationInfo, redirectPrevPage, redirectNextPage } = this.state;

		return (
			<>
				{redirectPrevPage && <Redirect to={`/${Number(page) - 1}`} />}
				{redirectNextPage && <Redirect to={`/${Number(page) + 1}`} />}

				<Layout>
					<Title>Episodes</Title>
					{!hasLoaded && <SpinnerLoader />}
					{hasLoaded && hasError && <ErrorMessage />}
					{hasLoaded && !hasError && (
						<>
							<Divider />
							<Grid>
								{episodes.map((episode) => (
									<EpisodeCard key={episode.id} id={episode.id} name={episode.name} airDate={episode.air_date} episode={episode.episode} />
								))}
							</Grid>
							<Divider />
							<div className="d-flex justify-content-center">
								{/* <Link to={Boolean(paginationInfo.prev) ? `/${Number(page) - 1}` : `/${Number(page)}`}>
								<Button disabled={!Boolean(paginationInfo.prev)}>Previous</Button>
							</Link>
							<Link to={Boolean(paginationInfo.next) ? `/${Number(page) + 1}` : `/${Number(page)}`}>
								<Button disabled={!Boolean(paginationInfo.next)}>Next</Button>
							</Link> */}
								<Button onClick={this.goPrevPage} disabled={page === "1"}>
									Previous
								</Button>
								<Button onClick={this.goNextPage} disabled={!Boolean(paginationInfo.next)}>
									Next
								</Button>
							</div>
						</>
					)}
				</Layout>
			</>
		);
	}
}

export default Home;
