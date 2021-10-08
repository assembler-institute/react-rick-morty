import axios from "axios";

export async function makeRequest(url) {
  try {
    const response = await axios.get(url);
    return [response , false];
  } catch (error) {
    return [null , error];
  }
}