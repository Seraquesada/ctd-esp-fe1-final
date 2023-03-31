import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Characters } from '../types/rickAndMorty.types'
import { useGetCharacterByName, } from '../hooks/useApi'


interface initialType {
    data:Characters | null
    loading : boolean
    page: number
    name: string
}

const initialState: initialType = {
    data: null,
    loading : false,
    page: 1,
    name: "",
}




export const getCharacterByName = createAsyncThunk(
    "characters/characterByName",
    async({name, page} : {name: string, page: number})=>{
        const res = await useGetCharacterByName(name, page)
        return res;
    },
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
        searchingValue:(state,action) =>{
            state.name = action.payload
        }
    },
    extraReducers:(builder) => {
        builder
            // by name
            .addCase(getCharacterByName.pending, state => {
                state.loading = true;
            })
            .addCase(getCharacterByName.fulfilled, (state,action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCharacterByName.rejected,(state) => {
                state.loading = false;
            })
    },

})

export const {incrementPage,decrementPage,searchingValue} = characterSlice.actions;

export default characterSlice.reducer;