import axios from "axios";

// Creating default base calling for our API
export function makeApi() {
    return axios.create({
        baseURL: "https://rickandmortyapi.com/api/",
    });
}

export function getEpisodes(page = 1, api = makeApi()) {
    return api.get(`/episode?page=${page}`);
}

export function getEpisode(episodeId, api = makeApi()) {
    return api.get(`/episode/${episodeId}`);
}

export function getCharacter(characterId, api = makeApi()) {
    return api.get(`/character/${characterId}`);
}

export function getLocation(locationId, api = makeApi()) {
    return api.get(`/location/${locationId}`);
}

export function getUrl(url, api = makeApi()) {
    return api.get(url);
}

export function makePromises (urls = []) {
    return urls.map((url) => getUrl(url));
  }
  