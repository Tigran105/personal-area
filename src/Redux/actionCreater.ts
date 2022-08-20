import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchingWithAxiosMiddleware} from "../config";
import {IData} from "./contact";

export const getContacts = createAsyncThunk(
    "contact/fetchAll",
    async (_: undefined, thunkAPI) => {
        try {
            const response = await fetchingWithAxiosMiddleware("GET", "posts")
            return response.data
        } catch (error: unknown) {
            return thunkAPI.rejectWithValue("Any text here")
        }
    }
)

export const addContact = createAsyncThunk(
    'contact/add',
    async (data: IData, thunkAPI) => {
        try {
            const response = await fetchingWithAxiosMiddleware("POST", "posts", data)
            console.log(response.data, "<--------------response.data")
        } catch (error) {
            return thunkAPI.rejectWithValue("Any text here")
        }
    }
)

export const editContact = createAsyncThunk(
    'contact/edit',
    async (data: IData, thunkAPI) => {
        try {
            const response = await fetchingWithAxiosMiddleware("PUT", `posts/${data.id}`, data)
            console.log(response.data, "<--------------response.data")
        } catch (error) {
            return thunkAPI.rejectWithValue("Any text here")
        }
    }
)

export const deleteContact = createAsyncThunk(
    'contact/delete',
    async (id: number, thunkAPI) => {
        try {
            const response = await fetchingWithAxiosMiddleware("DELETE", `posts/${id}`)
            console.log(response.data, "<--------------response.data")
        } catch (error) {
            return thunkAPI.rejectWithValue("Any text here")
        }
    }
)