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

export async function getCharacter({ character }) {
	const url = path.join(routes.BASE_URL, routes.CHARACTER, character);
	const characterRequest = await fetch(url);
	const characterData = await characterRequest.json();

	const episodesRequest = await Promise.all(characterData.episode.map((episodeURL) => fetch(episodeURL)));
	const episodesData = await Promise.all(episodesRequest.map((episodeRequest) => episodeRequest.json()));

	return {
		character: characterData,
		episodes: episodesData,
	};
}

export async function getLocation({ location }) {
	const url = path.join(routes.BASE_URL, routes.LOCATION, location);
	const locationRequest = await fetch(url);
	const locationData = await locationRequest.json();

	const charactersRequest = await Promise.all(locationData.residents.map((characterURL) => fetch(characterURL)));
	const charactersData = await Promise.all(charactersRequest.map((characterRequest) => characterRequest.json()));

	return {
		location: locationData,
		characters: charactersData,
	};
}
