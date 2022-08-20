import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "./Redux/store";
import {getContacts} from "./Redux/actionCreater";


function App() {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getContacts())
    }, [])

    return (
        <div className="App">
            <h1 style={{textAlign: "center"}}>Personal Area</h1>
        </div>
    );
}

export default App;
