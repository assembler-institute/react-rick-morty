import client from "./client";

const getCharacter = async (characterId, baseUrl = client.baseUrl) => {
  return (await fetch(`${baseUrl}/character/${characterId}`)).json()
}

const getCharacters = async (episode) => {
  return Promise.all(
    episode.characters.map(async (character) => {
      return (await fetch(character)).json();
    })
  )
};

const charactersApi = {
  getCharacter,
  getCharacters,
};

export default charactersApi;
