import axios from "axios";

export async function getEpisodes (page) {
    const request = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);

    return request.data;
}


export async function getEpisode (episodeId = 1) {
    const request = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`);

    return request.data;
}


export async function getDataList(urls= []) {
        const responses = await Promise.all(urls.map((url) => axios.get(url)));
        const dataList = responses.map(response => response.data);

        return dataList;
}
