import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

import profile from '../assets/profile.png';

const TopVolunteers = () => {

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

        axios.get(`http://localhost:8080/eventsenrollment/`)
        .then(res => {
            
            for(let i = 0 ; i < res.data.length ; i++)
            {
                
            }

        });

    }, []);

    return (
        <div>
            <nav className="navigation">
                <div className="row">
                    <div className="col-md-6">
                        <div className="scrollmenu">
                            <a href="#home">More Powerful Together</a>
                            <a href="#home">Events</a>
                            <a href="#news">Top Volunteers</a>
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
                            <a href="#">My Profile</a>
                            <a href="#">My Events</a>
                            <a href="#">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section className="top-vol center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Top Volunteers</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md 12">
                            <p>Username Points</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md 12">
                            <p>Username Points</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md 12">
                            <p>Username Points</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TopVolunteers;