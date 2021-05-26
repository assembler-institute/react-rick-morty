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

export function getLocation(locationId, api = makeAPI()) {
  return api.get(`/location/${locationId}`);
}

export function getCharacter(characterId, api = makeAPI()) {
  return api.get(`/character/${characterId}`);
}

export function getCharacterSpecies(species, api = makeAPI()) {
  return api.get(`/character/?species=${species}`);
}

export function getCharacterStatus(status, api = makeAPI()) {
  return api.get(`/character/?status=${status}`);
}

export function getUrl(url, api = makeAPI()) {
  return api.get(`${url}`);
}

export function returnLocationId(url) {
  const originArr = url.split("/");
  const originId = originArr[originArr.length - 1];
  return originId;
}

export function makePromises(urls = []) {
  return urls.map((url) => getUrl(url));
}
