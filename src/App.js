import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
    AddEvent,
    ChangePassword,
    EditEvent,
    EditProfile,
    Event,
    EventPage,
    Login,
    Profile,
    Register,
    TopVolunteers,
} from './pages';

function App() {
    return (
    <Router>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='changepassword' element={<ChangePassword />} />
            <Route path='editevent' element={<EditEvent />} />
            <Route path='editprofile' element={<EditProfile />} />
            <Route path='event' element={<Event />} />
            <Route path='eventpage' element={<EventPage />} />
            <Route path='profile' element={<Profile />} />
            <Route path='topvolunteers' element={<TopVolunteers />} />
            <Route path='addevent' element={<AddEvent />} />
        </Routes>
    </Router>
    );
}

export default App;