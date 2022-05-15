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
    const [top1name, setTop1name] = useState("Undefinded");
    const [top2name, setTop2name] = useState("Undefinded");
    const [top3name, setTop3name] = useState("Undefinded");
    const [top1points, setTop1points] = useState("Undefinded");
    const [top2points, setTop2points] = useState("Undefinded");
    const [top3points, setTop3points] = useState("Undefinded");

    useEffect(() => {
        if(window.sessionStorage.getItem("user_id") === null)
        {
            navigate("/");
        }

        axios.get(`http://localhost:8080/users/` + window.sessionStorage.getItem("user_id"))
        .then(res => {
            setNickname(res.data.nickname);
        });

        axios.get(`http://localhost:8080/topvolunteer`)
        .then(res => {

            let uid = 0;

            uid = res.data[0].split(" = ")[0];
            axios.get(`http://localhost:8080/users/` + uid)
            .then(res => {
                setTop1name(res.data.nickname)
            });
            setTop1points(res.data[0].split(" = ")[1])

            // uid = res.data[1].split(" = ")[0];
            // axios.get(`http://localhost:8080/users/` + uid)
            // .then(res => {
            //     setTop2name(res.data.nickname)
            // });
            // setTop2points(res.data[1].split(" = ")[1])

            // uid = res.data[2].split(" = ")[0];
            // axios.get(`http://localhost:8080/users/` + uid)
            // .then(res => {
            //     setTop3name(res.data.nickname)
            // });
            // setTop3points(res.data[2].split(" = ")[1])

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
            <section className="top-vol center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Top Volunteers</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md 12">
                            <p>{top1name} {top1points}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md 12">
                            <p>{top2name} {top2points}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md 12">
                            <p>{top3name} {top3points}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TopVolunteers;