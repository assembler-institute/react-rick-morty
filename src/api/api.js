import axios from "axios";

// Used axios.create() to establish a base API to make requests
function makeAPI() {
  return axios.create({ baseURL: "https://rickandmortyapi.com/api" });
}

export function getEpisodes(page = 1, api = makeAPI()) {
  return api.get(`/episode?page=${page}`);
}

// Codi a Episode
// const promises = data.characters.map(character) => axios.get(character))

// const charactersResponse = await Promise.all(promises)
// const characters  = charactersResponse(map(character) => characters.data )
