import axios from "axios";

export function fetchApi(uri) {
  return axios.get(uri);
}
