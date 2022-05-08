import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

import profile from '../assets/profile.png';

const EditProfile = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if(window.sessionStorage.getItem("user_id") === null)
        {
            navigate("/");
        }
    }, []);

    return (
        <div>
            
        </div>
    );
}

export default EditProfile;