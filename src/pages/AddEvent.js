import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

const AddEvent = () => {
    const [name, setName] = useState("");
    const [startdate, setStartdate] = useState("");
    const [city, setCity] = useState("");
    const [enddate, setEnddate] = useState("");
    const [type, setType] = useState("");
    const [organization, setOrganization] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [volunteers, setVolunteers] = useState("");

    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        setImage(content);
    };

    const uploadFile = (event) => {
        let file = event.target.files[0];

        if (file) {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsDataURL(file);
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const e = {
            name : name,
            startdate : startdate,
            city : city,
            enddate : enddate,
            type : type,
            organization : organization,
            contact : contact,
            image: image,
            description: description,
            volunteers: volunteers,
        };

        axios.post(`http://localhost:8080/event/add`, e)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    const navigate = useNavigate();
    useEffect(() => {
        if(window.sessionStorage.getItem("user_id") === null)
        {
            navigate("/");
        }
    }, []);


    return (
        <div>
            <nav class="navigation">
                <div class="row">
                    <div class="col-md-3">
                        <div class="scrollmenu">
                        <a href="http://localhost:3000/">More Powerful Together</a>
                        <a href="http://localhost:3000/event">Events</a>
                        <a href="http://localhost:3000/topvolunteers">Top Volunteers</a>
                        </div>
                    </div>
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-3">
                        <div class="dropdown" style="margin-left:240px">
                            <button class="dropbtn">Fname Lname</button>
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
                        <h2>Add Event</h2>
                    </div>
                </div>
                <div class="container center form-edit">
                    <form onSubmit={handleSubmit}>
                        <div class="row">
                            <div class="col-md-6">
                                <p>Name</p>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div class="col-md-6">
                                <p>Start Date</p>
                                <input type="date" value={startdate} onChange={(e) => setStartdate(e.target.value)}/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <p>City</p>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                            </div>
                            <div class="col-md-6">
                                <p>End Date</p>
                                <input type="date" value={enddate} onChange={(e) => setEnddate(e.target.value)}/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <p>Type</p>
                                <input type="text" value={type} onChange={(e) => setType(e.target.value)}/>
                            </div>
                            <div class="col-md-6">
                                <p>Organization Team</p>
                                <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)}/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <p>Contact info</p>
                                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}/>
                            </div>
                            <div class="col-md-6">
                                <p>Image</p>
                                <input type="file" onChange={uploadFile}/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <p>Description</p>
                                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                            <div class="col-md-6">
                                <p>Number of volunteers</p>
                                <input type="text" value={volunteers} onChange={(e) => setVolunteers(e.target.value)}/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button class="profil-button" type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default AddEvent;