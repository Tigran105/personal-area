import { combineReducers, configureStore } from '@reduxjs/toolkit'
import contacts from './contact'


const reducer = combineReducers({
    contacts
})

const store = configureStore({reducer})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store