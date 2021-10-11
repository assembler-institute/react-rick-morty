import axios from "axios";

export const urlArr = ["episode", "location", "character"];
export const pages = eLength(34);

function eLength(l) {
  const episodesArr = Array.from(Array(l).keys()).map((_, i) => ++i);
  return episodesArr;
}

function ListLength(urlArray) {
  return axiosGet(urlArray).then((data) => {
    const lenghts = data.data.info.count;
    return eLength(lenghts);
  });
}

async function arrLength(arrayType) {
  const test = await arrayType;
  return test;
}

export default function axiosGet(url, page) {
  return axios.get(`https://rickandmortyapi.com/api/${url}?page=${page}`);
}

export function axiosId(url, ids) {
  return axios.get(`https://rickandmortyapi.com/api/${url}/${ids}`);
}

export const episodeArrLength = arrLength(ListLength(urlArr[0]));
export const locationArrLength = arrLength(ListLength(urlArr[1]));
export const charactersArrLength = arrLength(ListLength(urlArr[2]));
