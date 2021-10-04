import client from "./client";

const getLocation = async (locationId, baseUrl = client.baseUrl) => {
  return (await fetch(`${baseUrl}/location/${locationId}`)).json()
}

const getResidents = async (location) => {
  return Promise.all(
    location.residents.map(async (resident) => {
      const response = await fetch(resident);
      return response.json()
    })
  )
};

const locationsApi = {
  getLocation,
  getResidents
};

export default locationsApi;
