import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

import profile from '../assets/profile.png';

const Register = () => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [confpass, setConfpass] = useState("");
    const [occupation, setOccupation] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password === confpass)
        {
            const user = {
                fname : fname,
                lname : lname,
                username : username,
                email : email,
                phone : phone,
                password : password,
                country : country,
                city : city,
                occupation : occupation,
            };

            axios.post(`http://localhost:8080/createUser`, user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
        }
    }

    return (
        <div>
            <nav className="navigation">
                <div className="row">
                    <div className="col-md-6">
                        <div className="scrollmenu">
                            <a href="#home">More Powerful Together</a>
                        </div>
                    </div>
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3">
                        <a href="http://localhost:3000/"><p>Login</p></a>
                    </div>
                </div>
            </nav>
            <section className="profile">
                <div className="row center">
                    <div className="col-md-12">
                        <h2>More Powerful Together</h2>
                        <p>Start where you are. Use what you have. Do what you can.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="container center form-edit">
                        <div className="row">
                            <div className="col-md-6">
                                <p>Email</p>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <p>Username</p>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p>First Name</p>
                                <input type="text" value={fname} onChange={(e) => setFname(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <p>Country</p>
                                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p>Last Name</p>
                                <input type="text" value={lname} onChange={(e) => setLname(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <p>City</p>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p>Password</p>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <p>Phone Number</p>
                                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p>Confirm Password</p>
                                <input type="password" value={confpass} onChange={(e) => setConfpass(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <p>Occupation</p>
                                <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button className="login-button" type="submit">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Register;