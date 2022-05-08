import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

import profile from '../assets/profile.png';

const EditEvent = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if(window.sessionStorage.getItem("user_id") === null)
        {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <nav className="navigation">
                <div className="row">
                    <div className="col-md-3">
                        <div className="scrollmenu">
                            <a href="http://localhost:3000/">More Powerful Together</a>
                            <a href="http://localhost:3000/event">Events</a>
                            <a href="http://localhost:3000/topvolunteers">Top Volunteers</a>
                        </div>
                    </div>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-3">
                        <div className="dropdown dd-event">
                            <button className="dropbtn">Fname Lname</button>
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
                        <h2>Edit Event</h2>
                    </div>
                </div>
                <div className="container center form-edit">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Name</p>
                                    <input type="text"/>
                                </div>
                                <div className="col-md-6">
                                    <p>Start Date</p>
                                    <input type="date"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>City</p>
                                    <input type="text"/>
                                </div>
                                <div className="col-md-6">
                                    <p>End Date</p>
                                    <input type="date"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Type</p>
                                    <input type="text"/>
                                </div>
                                <div className="col-md-6">
                                    <p>Organisation Team</p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Contact Info</p>
                                    <input type="text"/>
                                </div>
                                <div className="col-md-6">
                                    <p>Image</p>
                                    <input type="file"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Description</p>
                                    <input type="text"/>
                                </div>
                                <div className="col-md-6">
                                    <p>Number of volunteers</p>
                                    <input type="text"/>
                                </div>
                            </div>
                            <div className="row pass-change-button">
                                <div className="col-md-6">
                                    <button className="profil-button">
                                        Save
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button className="profil-button">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <img src="../img/dummy-event.jpg" alt="" className="event-photo"/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EditEvent;