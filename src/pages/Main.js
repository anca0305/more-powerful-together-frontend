import React from 'react'
import axios from 'axios';
import { useNavigate, useParams, useSearchParams  } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

const Main = () => {

    return (
        <div>
            <nav className="navigation">
                <div className="row">
                    <div className="col-md-6">
                        <div className="scrollmenu">
                            <a href="http://localhost:3000/">More Powerful Together</a>
                        </div>
                    </div>
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3">
                    <div className="scrollmenu">
                            <a href="http://localhost:3000/Login">Login</a>
                            <a href="http://localhost:3000/Register">Register</a>
                        </div>
                    </div>
                </div>
            </nav>
            <div>

                <div class="container">

                    <div class="row">

                        <div class="col-md-8">

                            <h1 style={{fontSize: '60px', fontWeight: 'bold', marginTop: '200px', textAlign: 'center'   }}>More Powerful Together</h1>
                            <p style={{fontSize: '30px', fontWeight: 'bold', textAlign: 'center'}}>Start where you are. Use what you have.<br/> Do what you can.</p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Main;