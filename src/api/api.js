import axios from "axios";

export function myApi() {
  return axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
  });
}

export function getTitleEpisodes(page = 1, api = myApi()) {
  return api.get(`/episode?page=${page}`);
}

export function getEpisode(episodeId, api = myApi()) {
  return api.get(`/episode/${episodeId}`);
}

export function getCharacter(characterId, api = myApi()) {
  return api.get(`/character/${characterId}`);
}

export function getUrl(url, api = myApi()) {
  return api.get(url);
}
