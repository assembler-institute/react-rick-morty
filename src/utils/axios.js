import axios from "axios";

export async function  getEpisodes(page){
    try{
        const result=await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`)
        return result
    }
    catch(error){
        return[]
    }
}

