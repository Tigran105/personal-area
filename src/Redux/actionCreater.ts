import {createAsyncThunk} from "@reduxjs/toolkit";
import contactService from "../Services/contactService"
import {IContact} from "../Types/contact";
import {IUser} from "../Types/user";
import userService from "../Services/userService";
import {setMessage} from "./notification";


export const getContacts = createAsyncThunk(
    "contact/fetchAll",
    async (_: undefined, {dispatch}) => {
        try {
            return await contactService.getData()
        } catch (error) {
            dispatch(setMessage("Something went wrong! Please check your internet connection"))
        }
    }
)

export const addContact = createAsyncThunk(
    'contact/add',
    async (data: Omit<IContact, "id">, {dispatch}) => {
        try {
            const response = await contactService.addContact(data)
            dispatch(setMessage("Contact successfully added"))
            return response
        } catch (error) {
            dispatch(setMessage("Something went wrong!"))
        }
    }
)

export const updateContact = createAsyncThunk(
    'contact/edit',
    async (data: IContact, {dispatch}) => {
        try {
            const response = await contactService.updateContact(data)
            dispatch(setMessage("Contact successfully updated"))
            return response
        } catch (error) {
            dispatch(setMessage("Something went wrong!"))
        }
    }
)

export const deleteContact = createAsyncThunk(
    'contact/delete',
    async (id: number, {dispatch}) => {
        try {
            const response = await contactService.deleteContact(id)
            dispatch(setMessage("Contact successfully deleted"))
            return response
        } catch (error) {
            dispatch(setMessage("Something went wrong!"))
        }
    }
)

export const login = createAsyncThunk(
    "user/login",
    async (data: Omit<IUser, "id">, {dispatch}) => {
        try {
            return await userService.login(data)
        } catch (error) {
            dispatch(setMessage("Something went wrong! Please check your email or password"))
        }
    }
)

export const logout = createAsyncThunk(
    "user/logout",
    async (_: undefined, {dispatch}) => {
        try {
            return await userService.logout()
        } catch (error) {
            dispatch(setMessage("Something went wrong!"))
        }
    }
)

export const registration = createAsyncThunk(
    "user/registration",
    async (data: Omit<IUser, "id">, {dispatch}) => {
        try {
            const users = await userService.getAll()
            let isNewUser = true
            users.forEach((user: IUser) => {
                if (user.email === data.email) {
                    isNewUser = false
                }
            })
            if (!isNewUser) {
                dispatch(setMessage("This email is already exists"))
            }
            const response = await userService.registration(data)
            dispatch(setMessage("Successfully registered"))
            return response
        } catch (error) {
            dispatch(setMessage("Something went wrong! Please check your email or password"))
        }
    }
)