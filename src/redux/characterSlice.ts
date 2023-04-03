import { Character } from './../types/rickAndMorty.types';
import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Characters } from '../types/rickAndMorty.types'
import { useGetCharacterById, useGetCharacterByName, } from '../hooks/useApi'


interface initialType {
    data:Characters | null
    loading : boolean
    page: number
    name: string
    character :Character | null
    id : number
}

const initialState: initialType = {
    data: null,
    loading : false,
    page: 1,
    name: "",
    character: null,
    id: 0
}


export const getCharacterByName = createAsyncThunk(
    "characters/characterByName",
    async({name, page} : {name: string, page: number})=>{
        const res = await useGetCharacterByName(name, page)
        return res;
    },
)

export const getCharacterById = createAsyncThunk(
    "characters/charactersByID",
    async (id: number)=>{
        const res = await useGetCharacterById(id);
        return res;
    }
)

/**
 * Type '(state: WritableDraft<initialType>, action: { payload: any; type: string; }) => { esFavorito: boolean; id?: number | undefined; name?: string | undefined; ... 9 more ...; created?: string | undefined; } | undefined' is not assignable to type 'CaseReducer<initialType, { payload: any; type: string; }> | CaseReducerWithPrepare<initialType, PayloadAction<any, string, any, any>>'.
  Type '(state: WritableDraft<initialType>, action: { payload: any; type: string; }) => { esFavorito: boolean; id?: number | undefined; name?: string | undefined; ... 9 more ...; created?: string | undefined; } | undefined' is not assignable to type 'CaseReducer<initialType, { payload: any; type: string; }>'.
    Type '{ esFavorito: boolean; id?: number | undefined; name?: string | undefined; status?: string | undefined; species?: string | undefined; type?: string | undefined; gender?: string | undefined; ... 5 more ...; created?: string | undefined; } | undefined' is not assignable to type 'void | initialType | WritableDraft<initialType>'.
      Type '{ esFavorito: boolean; id?: number | undefined; name?: string | undefined; status?: string | undefined; species?: string | undefined; type?: string | undefined; gender?: string | undefined; ... 5 more ...; created?: string | undefined; }' is not assignable to type 'void | initialType | WritableDraft<initialType>'.
        Type '{ esFavorito: boolean; id?: number | undefined; name?: string | undefined; status?: string | undefined; species?: string | undefined; type?: string | undefined; gender?: string | undefined; ... 5 more ...; created?: string | undefined; }' is missing the following properties from type 'WritableDraft<initialType>': data, loading, page, characterts(2322)
 */
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
        },
        idSetter:(state,action) =>{
            state.id = action.payload;
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
            //by id
            .addCase(getCharacterById.pending, state =>{
                state.loading = true;
            })
            .addCase(getCharacterById.fulfilled, (state,action) =>{
                state.loading = false;
                state.character = action.payload;
            })
            .addCase(getCharacterById.rejected,(state) => {
                state.loading = false;
            })
    },

})

export const {incrementPage,decrementPage,searchingValue,idSetter,} = characterSlice.actions;

export default characterSlice.reducer;