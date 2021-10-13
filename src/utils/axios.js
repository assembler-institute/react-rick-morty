import axios from "axios";

export async function  getEpisodes(page){
    try{
        const result= await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`)
        return result
    }
    catch(error){
        return[]
    }
 }
export async function getEpisode(episodeId) {

        const result=  await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
        return result

}


export async function getCharacter(characterId){
    try{
        const result=await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
        return result
    }
    catch{(error)
    return []}
}

export async function getLocation(locationId){
    try{
        const result=await axios.get(`https://rickandmortyapi.com/api/location/${locationId}`)
        return result
    }
    catch{(error)
    return []}
}