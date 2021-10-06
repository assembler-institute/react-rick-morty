import http from "services/httpService";
import client from "./client";

const getCharacter = async (characterId, baseUrl = client.baseUrl) => {
  return http.get(`${baseUrl}/character/${characterId}`);
}

const getCharacters = async (episode) => Promise.all(
  episode.characters.map(async characterUrl => http.get(characterUrl))
)

const charactersApi = {
  getCharacter,
  getCharacters,
};

export default charactersApi;
