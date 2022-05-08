import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

import profile from '../assets/profile.png';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    sessionStorage.removeItem('user_id');

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/register");
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const pass = { pass : password}

        axios.post(`http://localhost:8080/login/`+email, pass)
        .then(res => {
            //console.log(res.data[0].identities[0].user_id);
            console.log(res.data[0]);
            if(res.data[0] != null)
            {
                window.sessionStorage.setItem("user_id", res.data[0].identities[0].user_id);
                navigate("/Event")
            }
        })
    }

    return (
        <div>
            <nav className="navigation">
                <div className="row">
                    <div className="col-md-3">
                        <div className="scrollmenu">
                            <a href="#home">More Powerful Together</a>
                        </div>
                    </div>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-3">
                        <p>Register</p>
                    </div>
                </div>
            </nav>
            <section className="login-section">
                <div className="row">
                    <div className="col-md-12">
                        <h2>More Powerful Together</h2>
                        <p>Start where you are. Use what you have. Do what you can.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="container login">
                        <div className="row container-login">
                            <div className="col-md-12">
                                <p>Sign in manually</p>
                            </div>
                        </div>
                        <div className="row container-login">
                            <div className="col-md-12">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row container-login">
                            <div className="col-md-12">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row container-login">
                            <div className="col-md-12">
                                <button className="login-button" type="submit">Sign In</button>
                            </div>
                        </div>
                        <div className="row container-login">
                            <div className="col-md-12">
                                <p>Dont have account? Register</p>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login;