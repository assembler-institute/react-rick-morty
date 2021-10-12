import { Component } from "react";
import { fetchDataset, getCharacter } from "../../api/requests";

import { ErrorMessageCard } from "../../components/MessageCard";
import CharacterProfile from "../../components/CharacterProfile";
import Divider from "../../components/Divider";
import EpisodeCard from "../../components/EpisodeCard";
import EpisodeGrid from "../../components/EpisodeGrid";
import SpinnerLoader from "../../components/SpinnerLoader";
import { withLayout } from "../../hocs";

class Character extends Component {
	constructor(props) {
		super(props);

		this.state = {
			character: null,
			episodes: [],
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
			const { id } = this.props;
			const { data: character, error } = await getCharacter({ id });

			if (error !== null) throw error;
			const { dataset: episodes } = await fetchDataset(character.episode);

			this.setState((prevState) => ({
				...prevState,
				hasLoaded: true,
				character: character,
				episodes: episodes,
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
		const { hasLoaded, hasError, character, episodes } = this.state;

		return (
			<>
				{!hasLoaded && <SpinnerLoader />}
				{hasLoaded && hasError && <ErrorMessageCard />}
				{hasLoaded && !hasError && (
					<>
						{<CharacterProfile {...character} />}

						<Divider />
						<h5>Episodes</h5>
						<Divider thickness="1px" />
						<EpisodeGrid>
							{episodes.map((episode) => (
								<EpisodeCard key={episode.id} id={episode.id} name={episode.name} airDate={episode.air_date} episode={episode.episode} />
							))}
						</EpisodeGrid>
					</>
				)}
			</>
		);
	}
}

export default withLayout(Character);
