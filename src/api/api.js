import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

export async function getEpisodes(page = 1) {
  const request = await axios.get(`${BASE_URL}/episode?page=${page}`)
  
  return request.data;
}

export async function getEpisode(episodeId = 1) {
  const request = await axios.get(`${BASE_URL}/episode/${episodeId}`);
  
  return request.data;
}

export async function getCharacter(characterId = 1) {
  const request = await axios.get(`${BASE_URL}/character/${characterId}`);

  return request.data;
}

export async function getLocation(locationId = 1) {
  const request = await axios.get(`${BASE_URL}/location/${locationId}`);

  return request.data;
}

export async function getUrl(url) {
  const request = await axios.get(url);
  return request.data;
}

export async function getDataList(urls = []) {
  const responses = await Promise.all(urls.map((url) => axios.get(url)));
  const dataList = responses.map(response => response.data);

  return dataList;
}
