import axios from "axios";

// Used axios.create() to establish a base API to make requests
function makeAPI() {
  return axios.create({ baseURL: "https://rickandmortyapi.com/api" });
}

export function getEpisodes(page = 1, api = makeAPI()) {
  return api.get(`/episode?page=${page}`);
}

export function getEpisode(episodeId, api = makeAPI()) {
  return api.get(`/episode/${episodeId}`);
}

export function getUrl(url, api = makeAPI()) {
  return api.get(`${url}`);
}
