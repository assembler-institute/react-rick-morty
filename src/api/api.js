import axios from "axios";

export function makeApi() {
  return axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
  });
}

// La utiilidad está en que de estqa forma podemos hacer:
// axios.get("/episodes") y ya lo tenemos, sin tener que poner la baseURL

export function getEpisodes(page = 1, api = makeApi()) {
  return api.get(`/episode?page=${page}`);
}
export function getEpisode(episodeId = 1, api = makeApi()) {
  return api.get(`/episode/${episodeId}`);
}
export function getCharacter(episodeId = 1, api = makeApi()) {
  return api.get(`/character/${episodeId}`);
}
export function getUrl(url, api = makeApi()) {
  return api.get(url);
}
