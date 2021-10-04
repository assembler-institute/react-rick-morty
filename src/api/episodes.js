import apiClient from "./client";

const getAllEpisodes = async (page = 1, baseUrl = apiClient.baseUrl) => {
  return (await fetch(`${baseUrl}/episode?page=${page}`)).json()
}

const getEpisode = async (episodeId, baseUrl = apiClient.baseUrl) => {
  return (await fetch(`${baseUrl}/episode/${episodeId}`)).json()
}

const getEpisodes = async (character) => {
  return Promise.all(
    character.episode.map(async (episode) => {
      const response = await fetch(episode);
      return response.json()
    })
  )
};

const episodesApi = {
  getAllEpisodes,
  getEpisodes,
  getEpisode,
};

export default episodesApi;
