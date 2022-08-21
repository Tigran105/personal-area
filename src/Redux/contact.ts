import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {addContact, deleteContact, updateContact, getContacts} from "./actionCreater";
import {IContact} from "../Types/contact";


interface IState {
    contacts: IContact[],
    loading: boolean,
}

const initialState: IState = {
    contacts: [],
    loading: false,
}

const slice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: {
        [getContacts.pending.type]: (state: IState) => {
            state.loading = true
        },
        [getContacts.fulfilled.type]: (state: IState, action: PayloadAction<IContact[]>) => {
            state.contacts = action.payload
            state.loading = false
        },
        [addContact.pending.type]: (state: IState) => {
            state.loading = true
        },
        [addContact.fulfilled.type]: (state: IState, action: PayloadAction<IContact[]>) => {
            state.contacts = action.payload
            state.loading = false;
        },
        [updateContact.pending.type]: (state: IState) => {
            state.loading = true
        },
        [updateContact.fulfilled.type]: (state: IState, action: PayloadAction<IContact[]>) => {
            state.contacts = action.payload
            state.loading = false;
        },
        [deleteContact.pending.type]: (state: IState) => {
            state.loading = true
        },
        [deleteContact.fulfilled.type]: (state: IState, action: PayloadAction<IContact[]>) => {
            state.contacts = action.payload
            state.loading = false;
        },
    }
})

export default slice.reducer