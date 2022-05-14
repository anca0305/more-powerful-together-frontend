import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

import profile from '../assets/profile.png';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [occupation, setOccupation] = useState("");
    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        if(window.sessionStorage.getItem("user_id") === null)
        {
            navigate("/");
        }
        axios.get(`http://localhost:8080/users/` + window.sessionStorage.getItem("user_id"))
        .then(res => {
            setNickname(res.data.nickname);
            setUsername(res.data.nickname);
            setEmail(res.data.email);
            setFname(res.data.family_name);
            setLname(res.data.given_name);
            setCountry(res.data.user_metadata.country);
            setCity(res.data.user_metadata.city);
            setPhone(res.data.user_metadata.phone);
            setOccupation(res.data.user_metadata.occupation);
        });
    }, []);

    return (
        <div>
            <nav className="navigation">
            <div className="row">
                <div className="col-md-6">
                    <div className="scrollmenu">
                        <a href="http://localhost:3000/event">More Powerful Together</a>
                        <a href="http://localhost:3000/event">Events</a>
                        <a href="http://localhost:3000/topvolunteers">Top Volunteers</a>
                    </div>
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-1">
                </div>
                <div className="col-md-3">
                    <div className="dropdown dd-event">
                        <button className="dropbtn">{nickname}</button>
                        <div className="dropdown-content">
                        <a href="http://localhost:3000/profile">My Profile</a>
                        <a href="http://localhost:3000/">Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <section className="profile">
            <div className="row center">
                <div className="col-md-12">
                    <h2>My Profile</h2>
                </div>
            </div>
            <div className="row profil-div">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                <img src={profile} className="profil-photo"/>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-6">
                    <p>Username: {username}</p>
                    <p>Email: {email}</p>
                    <p>First Name: {fname}</p>
                    <p>Last Name: {lname}</p>
                    <p>Country: {country}</p>
                    <p>City: {city}</p>
                    <p>Phone number: {phone}</p>
                    <p>Occupation: {occupation}</p>
                    
                </div>
            </div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 align-right">
                    <button className="profil-button">Edit Profile</button>
                </div>
                <div className="col-md-4">
                    <button className="profil-button">Change Password</button>
                </div>
            </div>
        </section>
        </div>
    );
}

export default Profile;