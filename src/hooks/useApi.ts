import { Character, Characters } from './../types/rickAndMorty.types';
import axios from "axios";

const API_CHARACTRER = "https://rickandmortyapi.com/api/character/";
const API_EPISODE = "https://rickandmortyapi.com/api/episode/";

export const useGetCharacterByName = async (name: string,page: number)=>{
    const {data} = await axios.get(`${API_CHARACTRER}?page=${page}&name=${name}`)
    return data;
}

export const useGetCharacterById = async (id : number) =>{
    const {data} = await axios.get(`${API_CHARACTRER}${id}`)
    return data;
}

export const useGetEpisodesByCharacter = async (id : number) =>{
    const {data} = await axios.get(API_EPISODE)
    
}

