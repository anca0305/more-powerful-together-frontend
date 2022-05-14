import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

import profile from '../assets/profile.png';

const ChangePassword = () => {

    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        if(window.sessionStorage.getItem("user_id") === null)
        {
            navigate("/");
        }
        axios.get(`http://localhost:8080/users/` + window.sessionStorage.getItem("user_id"))
        .then(res => {
            setNickname(res.data.nickname);
        });
    }, []);

    return (
        <div>
            <nav class="navigation">
                <div class="row">
                    <div class="col-md-6">
                        <div class="scrollmenu">
                            <a href="http://localhost:3000/event">More Powerful Together</a>
                            <a href="http://localhost:3000/event">Events</a>
                            <a href="http://localhost:3000/topvolunteers">Top Volunteers</a>
                        </div>
                    </div>
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-3">
                        <div class="dropdown dd-event">
                            <button className="dropbtn">{nickname}</button>
                            <div class="dropdown-content">
                            <a href="http://localhost:3000/profile">My Profile</a>
                            <a href="http://localhost:3000/">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section class="profile">
                <div class="row center">
                    <div class="col-md-12">
                        <h2>Change Password</h2>
                    </div>
                </div>
                <div class="container center form-edit">
                    <div class="row">
                        <div class="col-md-12">
                            <p>Username</p>
                            <input type="text"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <p>First Name</p>
                            <input type="text"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <p>Last Name</p>
                            <input type="text"/>
                        </div>
                    </div>
                    <div class="row pass-change-button">
                        <div class="col-md-12">
                            <button class="profil-button">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ChangePassword;