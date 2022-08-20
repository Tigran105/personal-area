import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getContacts } from "./actionCreater";

export interface IData {
    id?: number,
    title?: string,
    address?: string
}

interface IState {
    contacts: Array<IData>,
    loading: boolean,
    errorMessage: string
}

const initialState: IState = {
    contacts: [],
    loading: false,
    errorMessage: ""
}

const slice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: {
        [getContacts.pending.type]: (state: IState) => {
            state.loading = true
        },
        [getContacts.fulfilled.type]: (state: IState, action: PayloadAction<IData[]>) => {
            state.contacts = action.payload
            state.errorMessage = ''
            state.loading = false
        },
        [getContacts.rejected.type]: (state: IState, action: PayloadAction<string>) => {
            state.loading = false
            state.errorMessage = action.payload
        }
    }
})

export default slice.reducer