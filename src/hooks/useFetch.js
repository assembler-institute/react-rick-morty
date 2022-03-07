import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch (url) {
    const [fetchState, setFetchState] = useState({
        state: "loading",
        error:null,
        data:null,
    })
    useEffect(()=>{
        const getData = async () => {
            setFetchState({
                state: "loading",
                error:null,
                data:null,
            })
        try{   
            const {data} = await axios.get(url)
                setFetchState({
                    state:"success",
                    error:null,
                    data:data
                })
        }
        catch{
            setFetchState({
                state:"error",
                error:"Failed to load the content",
                data:null
            })
        
        }
            
        }
        getData()
    },[url])
    return fetchState
}