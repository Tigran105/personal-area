import React from 'react';
import {Route, Routes} from "react-router";
import Contacts from "./Components/Contacts/contacts";
import {useSelector} from "react-redux";
import {RootState} from "./Redux/store";
import Auth from "./Components/Auth/auth";
import Notification from "./Components/Notification/notification";


function App() {
    const {message} = useSelector((state: RootState) => state.notification)
    return (
        <div className="App">
            <Notification message={message}/>
            <Routes>
                <Route path="/login" element={<Auth/>}/>
                <Route path="/" element={<Contacts/>}/>
                <Route path="/*" element={<Auth/>}/>
            </Routes>
        </div>
    );
}

export default App;
