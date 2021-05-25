import axios from "axios";

export function makeApi() {
  return axios.create({ baseURL: "https://rickandmortyapi.com/api/" });
}

export function getEpisodes(page = 1, api = makeApi()) {
  return api.get(`/episode?page=${page}`);
}
