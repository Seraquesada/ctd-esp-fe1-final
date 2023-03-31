import axios from "axios";

const API = "https://rickandmortyapi.com/api/character/"

export const useGetCharacterByName = async (name: string,page: number)=>{
    const {data} = await axios.get(`${API}?page=${page}&name=${name}`)
    return data;
}