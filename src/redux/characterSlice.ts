import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Characters } from '../types/rickAndMorty.types'

interface initialType {
    data:Characters | null
    loading : boolean
    page: number
}

const initialState: initialType = {
    data: null,
    loading : false,
    page: 1
}


export const getCharacter = createAsyncThunk(
    "characters/characters",
    async (page: number) => {
        const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        return data;
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
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getCharacter.pending, state => {
                state.loading = true;
            })
            .addCase(getCharacter.fulfilled, (state,action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCharacter.rejected,(state,action) => {
                state.loading = false;
            })
    },

})

export const {incrementPage,decrementPage} = characterSlice.actions;

export default characterSlice.reducer;