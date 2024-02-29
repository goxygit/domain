import { get, getDatabase, ref } from "firebase/database";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { database } from "../app/firebase";

export type variants_of_questions_type = {
    language: "English" | "French" | "German" | "Spanish"
    questions: questions_type[]
}
export type questions_type = {
    question: string
    description: string
    variants: variants
    type: "string" | "string_and_emoji" | "checkbox" | "circle"
}
export type variants = variants_type[] | variants_type[][]
export type variants_type = {
    text: string
    emoji?: string
}
type dataType = {
    variants_of_questions: variants_of_questions_type[]

}
type initialState = {
    data: dataType,
    status: string
    language: "English" | "French" | "German" | "Spanish"
}
// Асинхронный thunk для чтения данных из базы данных
export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const dataRef = ref(database);
    const snapshot = await get(dataRef);
    const data = snapshot.val();

    return data[0];
});

// Создание слайса
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: {

        },
        language: "English",
        status: 'idle',
    } as initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';

                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export default dataSlice.reducer;
export const selectData = (state: RootState) => state.data.data;