import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface INotification {
    message: string
}

const initialState: INotification = {
    message: ""
}

const slice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setMessage: (state: INotification, action: PayloadAction<string>) => {
            state.message = action.payload
        },
        clearMessage: (state: INotification) => {
            state.message = ""
        }
    }
})

export const {setMessage, clearMessage} = slice.actions
export default slice.reducer