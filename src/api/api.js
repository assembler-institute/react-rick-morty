import axios from "axios";

function makeApi() {
  return axios.create({
    baseURL: "https://rickandmortyapi.com/api",
  });
}

export function getEpisodes(page = 1) {
  return makeApi().get(`/episode?page=${page}`);
}

export function getEpisode(episodeId = 1) {
  return makeApi().get(`/episode/${episodeId}`);
}

export function getCharacter(characterId = 1) {
  return makeApi().get(`/character/${characterId}`);
}

export function getLocation(locationId = 1) {
  return makeApi().get(`/location/${locationId}`);
}

export function getUrl(url) {
  return makeApi().get(url);
}
