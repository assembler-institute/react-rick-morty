import React, { Component } from "react";
import { getEpisodes } from "../../api/requests";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";
import SpinnerLoader from "../../components/SpinnerLoader";
import ErrorMessage from "../../components/ErrorMessage";
import { NavLink } from "react-router-dom";

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
		console.log(this.state);
	}

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
		const { hasLoaded, hasError, episodes, paginationInfo } = this.state;

		return (
			<Layout>
				<section className="row">
					{!hasLoaded && <SpinnerLoader />}
					{hasLoaded && hasError && <ErrorMessage />}
					{hasLoaded && !hasError && (
						<>
							<div className="col col-12">
								<h1>Episodes loaded!</h1>
							</div>
							<div className="col col-12">
								<hr />
							</div>
							{episodes.map((episode) => (
								<EpisodeCard key={episode.id} id={episode.id} name={episode.name} airDate={episode.air_date} episode={episode.episode} />
							))}
							<div className="col col-12">
								<hr />
								<div className="d-flex justify-content-center">
									<NavLink to={`/${Number(page) - 1}`} className={`btn btn-primary mx-3 ${Boolean(paginationInfo.prev) ? null : "disabled"}`} isActive={() => Boolean(paginationInfo.prev)}>
										Load prev
									</NavLink>
									<NavLink to={`/${Number(page) + 1}`} className={`btn btn-primary mx-3 ${Boolean(paginationInfo.next) ? null : "disabled"}`} isActive={() => Boolean(paginationInfo.next)}>
										Load next
									</NavLink>
								</div>
							</div>
						</>
					)}
				</section>
			</Layout>
		);
	}
}

export default Home;
