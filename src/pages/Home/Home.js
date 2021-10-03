import React, { Component } from "react";
import { getEpisodes } from "../../api/requests";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			paginationInfo: null,
			episodes: [],
			hasLoaded: false,
			hasError: false,
			errorMessage: null,
		};
	}

	async componentDidMount() {
		this.loadEpisodes();
	}

	async componentDidUpdate(_, prevState) {
		prevState.page !== this.state.page && this.loadEpisodes();
	}

	goNextPage = () => {
		this.setState((prevState) => ({
			...prevState,
			page: ++prevState.page,
		}));
	};

	goPrevPage = () => {
		this.setState((prevState) => ({
			...prevState,
			page: --prevState.page,
		}));
	};

	loadEpisodes = async () => {
		try {
			const data = await getEpisodes({
				page: this.state.page,
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
				hasError: true,
				errorMessage: error,
			}));
		}
	};

	render() {
		const { hasLoaded, hasError, episodes, paginationInfo } = this.state;

		return (
			<Layout>
				<section className="row">
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
									{paginationInfo.prev && (
										<button onClick={this.goPrevPage} className="btn btn-primary mx-3">
											Load prev
										</button>
									)}
									{paginationInfo.next && (
										<button onClick={this.goNextPage} className="btn btn-primary mx-3">
											Load next
										</button>
									)}
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
