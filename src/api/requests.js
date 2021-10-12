import * as routes from "../constants/routes.js";
const path = require("path");

export async function fetchData(url) {
	const request = await fetch(url);

	if (!request.ok) {
		const error = {
			url,
			code: request.status,
			message: request.statusText,
		};

		return { data: null, error };
	}

	const data = await request.json();

	return { data, error: null };
}

export async function fetchDataset(urls) {
	const results = await Promise.all(urls.map((url) => fetchData(url)));
	const dataset = results.map((result) => result.data);
	const errors = results.map((result) => result.error);

	return { dataset, errors };
}

export async function getEpisodes({ page = 1 }) {
	const url = `${path.join(routes.BASE_URL, routes.EPISODE)}?page=${page}`;
	return fetchData(url);
}

export async function getEpisode({ id }) {
	const url = path.join(routes.BASE_URL, routes.EPISODE, id);
	return fetchData(url);
}

export async function getCharacter({ id }) {
	const url = path.join(routes.BASE_URL, routes.CHARACTER, id);
	return fetchData(url);
}

export async function getLocation({ id }) {
	const url = path.join(routes.BASE_URL, routes.LOCATION, id);
	return fetchData(url);
}
