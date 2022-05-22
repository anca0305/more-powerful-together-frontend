import React from 'react'
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

import profile from '../assets/profile.png';

const EditEvent = () => {

    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState("");
    const [contact, setContact] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [volunteers, setVolunteers] = useState("");
    const [img, setImg] = useState("");
    const [owner, setOwner] = useState("");
    const [searchParams] = useSearchParams();
    let fileReader;
    const handleFileRead = (e) => {
        const content = fileReader.result;
        setImg(content);
    };
    const uploadFile = (event) => {
        let file = event.target.files[0];
        if (file) {
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        if(window.sessionStorage.getItem("user_id") === null)
        {
            navigate("/");
        }
        axios.get(`http://localhost:8080/users/` + window.sessionStorage.getItem("user_id"))
        .then(res => {
            setNickname(res.data.nickname);
        });
        axios.get(`http://localhost:8080/events/`+searchParams.get('Id'))
        .then(res => {
            setVolunteers(res.data.volunteers);
            setCity(res.data.city);
            setName(res.data.name);
            setType(res.data.type);
            setOrganisation(res.data.organization);
            setStart(res.data.startdate);
            setEnd(res.data.enddate);
            setDescription(res.data.description);
            setContact(res.data.contact);
            setOwner(res.data.owner)
            setImg(res.data.image)
        });
    }, []);

    const deleteEvent = () => {
        axios.get(`http://localhost:8080/eventdelete/`+searchParams.get('Id'))
        .then(res => {
            console.log(res)
            navigate("/Event");
        });
    }
    const editEvent = () => {
        const e = {
            name : name,
            startdate : start,
            city : city,
            enddate : end,
            type : type,
            organization : organisation,
            contact : contact,
            image: img,
            description: description,
            volunteers: volunteers,
            owner: owner
        };
        axios.post(`http://localhost:8080/eventedit/`+searchParams.get('Id'), e)
        .then(res => {
            navigate("/Event");
        });
    }

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
                        <h2>Edit Event</h2>
                    </div>
                </div>
                <div className="container center form-edit">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Name</p>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="col-md-6">
                                    <p>Start Date</p>
                                    <input type="date" value={start} onChange={(e) => setStart(e.target.value)}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>City</p>
                                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                                </div>
                                <div className="col-md-6">
                                    <p>End Date</p>
                                    <input type="date" value={end} onChange={(e) => setEnd(e.target.value)}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Type</p>
                                    <input type="text" value={type} onChange={(e) => setType(e.target.value)}/>
                                </div>
                                <div className="col-md-6">
                                    <p>Organisation Team</p>
                                    <input type="text" value={organisation} onChange={(e) => setOrganisation(e.target.value)}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Contact Info</p>
                                    <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}/>
                                </div>
                                <div className="col-md-6">
                                    <p>Image</p>
                                    <input type="file" onChange={uploadFile}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>Description</p>
                                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                                <div className="col-md-6">
                                    <p>Number of volunteers</p>
                                    <input type="text" value={volunteers} onChange={(e) => setVolunteers(e.target.value)}/>
                                </div>
                            </div>
                            <div className="row pass-change-button">
                                <div className="col-md-6">
                                    <button className="profil-button" onClick={editEvent}>
                                        Save
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button className="profil-button" onClick={deleteEvent}>
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