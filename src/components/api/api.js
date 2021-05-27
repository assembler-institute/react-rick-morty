import axios from "axios";
import * as rout from "../../constants/routes";


 function makeAPI() {
    return axios.create({
        baseURL:"https://rickandmortyapi.com/api",
    });   
}

export function getEpisodesP(page =1, api=makeAPI()){

    return  api.get(`${rout.EPISODE}?page=${page}`)
}

export function getEpisode(episodeId, api=makeAPI()){

    return  api.get(`${rout.EPISODE}/${episodeId}`)
}
export function getUrls(url){

    return  axios.get(`${url}`)
}

export function getCharacter(caracterId, api=makeAPI()){

    return  api.get(`${rout.CHARACTER}/${caracterId}`)
}

export function getLocation(locationId, api=makeAPI()){

    return  api.get(`${rout.LOCATION}/${locationId}`)
}