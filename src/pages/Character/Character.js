import { Component } from "react";
import { getCharacter } from "../../api/requests";

import CharacterProfile from "../../components/CharacterProfile";
import EpisodeCard from "../../components/EpisodeCard";
import Layout from "../../components/Layout";
import SpinnerLoader from "../../components/SpinnerLoader";
import ErrorMessage from "../../components/ErrorMessage";

export default class Character extends Component {
	constructor(props) {
		super(props);

		this.state = {
			episodes: [],
			character: null,
			hasLoaded: false,
			hasError: false,
			errorMessage: null,
		};
	}

	componentDidMount() {
		this.loadCharacter();
	}

	componentDidUpdate(prevProps) {
		prevProps.id !== this.props.id && this.loadCharacter();
	}

	loadCharacter = async () => {
		try {
			const data = await getCharacter({
				character: this.props.id,
			});

			this.setState((prevState) => ({
				...prevState,
				hasLoaded: true,
				character: data.character,
				episodes: data.episodes,
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
		const { hasLoaded, hasError, character, episodes } = this.state;

		return (
			<Layout>
				<section className="row">
					{!hasLoaded && <SpinnerLoader />}
					{hasLoaded && hasError && <ErrorMessage />}
					{hasLoaded && !hasError && (
						<>
							<div className="col-12">{<CharacterProfile {...character} />}</div>
							<div className="col-12">
								<hr />
							</div>
							<div className="col-12">
								<h4>Episodes</h4>
							</div>
							<div className="col-12">
								<hr />
							</div>
							<div className="col-12 row">
								{episodes.map((episode) => (
									<EpisodeCard key={episode.id} id={episode.id} name={episode.name} airDate={episode.air_date} episode={episode.episode} />
								))}
							</div>
						</>
					)}
				</section>
			</Layout>
		);
	}
}
