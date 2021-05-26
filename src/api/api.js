import axios from "axios";

export function makeApi() {
  return axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    timeout: 4000,
  });
}

export function getEpisodes(page = 1, api = makeApi()) {
  return api.get(`/episode?page=${page}`);
}
export function getEpisode(episodeId, api = makeApi()) {
  return api.get(`/episode/${episodeId}`);
}

export function getUrl(url, api = makeApi()) {
	return api.get(url);
}
