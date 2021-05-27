import axios from "axios";

export function rickApi() {
  return axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
  });
}

export function getEpisodes(page = 1, api = rickApi()) {
  return api.get(`/episode?page=${page}`);
}

export function getEpisode(episodeId, api = rickApi()) {
  return api.get(`/episode/${episodeId}`);
}

export function getCharacter(characterId, api = rickApi()) {
  return api.get(`/character/${characterId}`);
}

export function getUrl(url, api = rickApi()) {
  return api.get(url);
}

export function getLocation(locationId, api = rickApi()) {
  return api.get(`/location/${locationId}`);
}
