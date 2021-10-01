import * as routes from "../constants/routes.js";

const path = require("path");

export async function getEpisodes({ page = 1 }) {
	const url = `${path.join(routes.BASE_URL, routes.EPISODE)}?page=${page}`;
	const request = await fetch(url);
	const data = await request.json();

	return data;
}

export async function getEpisode({ episode }) {
	const url = path.join(routes.BASE_URL, routes.EPISODE, episode);
	const episodeRequest = await fetch(url);
	const episodeData = await episodeRequest.json();

	const charactersRequest = await Promise.all(episodeData.characters.map((characterURL) => fetch(characterURL)));
	const charactersData = await Promise.all(charactersRequest.map((characterRequest) => characterRequest.json()));

	return {
		episode: episodeData,
		characters: charactersData,
	};
}
