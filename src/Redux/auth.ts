import {createSlice} from "@reduxjs/toolkit";
import {login, logout, registration} from "./actionCreater";
import userService from "../Services/userService";

interface IAuth {
    isLogin: boolean,
    loading: boolean,
}

const initialState: IAuth = {
    isLogin: false,
    loading: false,
}

const slice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        isAuthorized: (state: IAuth) => {
            state.isLogin = userService.checkToken()
        }
    },
    extraReducers: {
        [login.pending.type]: (state: IAuth) => {
            state.loading = true
        },
        [login.fulfilled.type]: (state: IAuth) => {
            state.isLogin = true
            state.loading = false
        },
        [registration.pending.type]: (state: IAuth) => {
            state.loading = true
        },
        [registration.fulfilled.type]: (state: IAuth) => {
            state.isLogin = true
            state.loading = false
        },
        [logout.pending.type]: (state: IAuth) => {
            state.loading = true
        },
        [logout.fulfilled.type]: (state: IAuth) => {
            state.isLogin = false
            state.loading = false
        },
    }
})

export const {isAuthorized} = slice.actions
export default slice.reducer