import http from "services/httpService";
import apiClient from "./client";

const getAllEpisodes = async (page = 1, baseUrl = apiClient.baseUrl) => {
  return http.get(`${baseUrl}/episode?page=${page}`)
}

const getEpisode = async (episodeId, baseUrl = apiClient.baseUrl) => {
  return http.get(`${baseUrl}/episode/${episodeId}`)
}

const getEpisodes = async (character) => Promise.all(
  character.episode.map(async episodeUrl => http.get(episodeUrl))
)

const episodesApi = {
  getAllEpisodes,
  getEpisodes,
  getEpisode,
};

export default episodesApi;
