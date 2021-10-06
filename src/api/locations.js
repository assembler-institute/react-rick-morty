import http from "services/httpService";
import client from "./client";

const getLocation = async (locationId, baseUrl = client.baseUrl) => {
  return http.get(`${baseUrl}/location/${locationId}`);
}

const getResidents = async (location) => Promise.all(
  location.residents.map(async residentsUrl => http.get(residentsUrl))
)

const locationsApi = {
  getLocation,
  getResidents
};

export default locationsApi;
