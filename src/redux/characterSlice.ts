
import { Character, Episode } from './../types/rickAndMorty.types';
import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import { Characters } from '../types/rickAndMorty.types'
import { useGetAllCharacters, useGetCharacterById,useGetEpisodesByCharacter  } from '../hooks/useApi'


interface initialType {
    data:Characters | null
    loading : boolean
    page: number
    name: string
    character :Character | null
    id : number
    favorites: Character[] 
    episodesByCharacter: Episode[] | Episode
}

const initialState: initialType = {
    data: null,
    loading : false,
    page: 1,
    name: "",
    character: null,
    id: 0,
    favorites: [],
    episodesByCharacter: []
}


export const getAllCharacters = createAsyncThunk(
    "characters/allCharacters",
    async({name, page} : {name: string, page: number})=>{
        const res = await useGetAllCharacters(name, page)
        return res;
    },
);

export const getCharacterById = createAsyncThunk(
    "characters/charactersByID",
    async (id: number)=>{
        const res = await useGetCharacterById(id);
        return res;
    }
);

export const getEpisodesByCharacter = createAsyncThunk(
    "characters/characterEpidoses",
    async (id: (string[] | number))=>{
        const res = await useGetEpisodesByCharacter(id)
        return res;
    }
)


const characterSlice = createSlice({
    name: 'characters',
    initialState,
    reducers:{
        incrementPage:(state) =>{
            state.page += 1
        },
        decrementPage:(state) =>{
            state.page -= 1
        },
        searchingValue:(state,action: PayloadAction<string>) =>{
            state.name = action.payload
        },
        idSetter:(state,action: PayloadAction<number>) =>{
            state.id = action.payload;
        },
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const character = state.data?.results.find((c) => c.id === action.payload);
            if (character) {
                character.esFavorito = !character.esFavorito;
            }
        },
        addToFavorites:(state, action : PayloadAction<Character>)=>{
            const character = state.data?.results.find((c) => c.id === action.payload.id);
            if (character) {
                const index = state.favorites.findIndex((c) => c.id === character.id);
                if (index !== -1) {
                    state.favorites.splice(index, 1);
                } else {
                    state.favorites.push(character);
                }
            }
        },
        deleteAllFavs:(state)=>{
            state.favorites = []
        },

    },
        extraReducers:(builder) => {
            builder
                // by name
                .addCase(getAllCharacters.pending, state => {
                    state.loading = true;
                })
                .addCase(getAllCharacters.fulfilled, (state,action: PayloadAction<Characters>) => {
                    state.loading = false;
                    state.data = action.payload;
                })
                .addCase(getAllCharacters.rejected,(state) => {
                    state.loading = false;
                })
                //by id
                .addCase(getCharacterById.pending, state =>{
                    state.loading = true;
                })
                .addCase(getCharacterById.fulfilled, (state,action : PayloadAction<Character>) =>{
                    state.loading = false;
                    state.character = action.payload;
                })
                .addCase(getCharacterById.rejected,(state) => {
                    state.loading = false;
                })
                //episode by character
                .addCase(getEpisodesByCharacter.pending, state =>{
                    state.loading = true;
                })
                .addCase(getEpisodesByCharacter.fulfilled, (state,action : PayloadAction<Episode[] | Episode>) =>{
                    state.loading = false;
                    state.episodesByCharacter = action.payload;
                })
                .addCase(getEpisodesByCharacter.rejected,(state) => {
                    state.loading = false;
                })

    },

})

export const {incrementPage,decrementPage,searchingValue,idSetter,toggleFavorite,addToFavorites,deleteAllFavs} = characterSlice.actions;

export default characterSlice.reducer;