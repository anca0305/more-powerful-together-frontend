import React from 'react'
import axios from 'axios';
import { useNavigate, useParams, useSearchParams  } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

import profile from '../assets/profile.png';
import dummy from '../assets/dummy-event.jpg';

const EventPage = () => {

    const [admin, setAdmin] = useState("false");
    const [type, setType] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [volunteers, setVolunteers] = useState("");
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [img, setImg] = useState("");
    const [join, setJoin] = useState(false);
    const [joinId, setJoinId] = useState("0");
    const [searchParams] = useSearchParams();
    const [nickname, setNickname] = useState("");

    let edit = "http://localhost:3000/editevent?Id="+searchParams.get('Id')

    useEffect(() => {
        axios.get(`http://localhost:8080/users/` + window.sessionStorage.getItem("user_id"))
        .then(res => {
            setNickname(res.data.nickname);
        });
        axios.get(`http://localhost:8080/events/`+searchParams.get('Id'))
        .then(res => {
            setImg(res.data.image);
            setName(res.data.name);
            setType(res.data.type);
            setOrganisation(res.data.organization);
            setStart(res.data.startdate);
            setEnd(res.data.enddate);
            setDescription(res.data.description);
            setContact(res.data.contact);
        });

        axios.get(`http://localhost:8080/eventsenrollment/`)
        .then(res => {
            console.log(res.data.length);
            if(res.data.length !== undefined)
            {
                let nr = 0;
                for(let i = 0 ; i < res.data.length ; i++)
                {
                    if(res.data[i].id_event === searchParams.get('Id'))
                    {
                        nr++;
                    }
                }
                setVolunteers(nr);
            }
            else
            {
                setVolunteers(0);
            }
        });
        
        axios.get(`http://localhost:8080/users/`+window.sessionStorage.getItem("user_id"))
        .then(res => {
            if(res.data.user_metadata.admin === "true")
            {
                setAdmin("true");
            }
        });
        
        axios.get(`http://localhost:8080/eventsenrollment/`)
        .then(res => {
            
            for(let i = 0 ; i < res.data.length ; i++)
            {
                if(res.data[i].user_id === window.sessionStorage.getItem("user_id"))
                {
                    if(res.data[i].id_event === searchParams.get('Id'))
                    {
                        setJoin(true);
                        setJoinId(res.data[i].id);
                    }
                }
            }

        });

      }, []);

    const joinEvent = async (event) => {

        if(join === true)
        {
            axios.delete(`http://localhost:8080/eventsenrollment/delete/`+joinId)
            .then(res => {
                console.log(res);
                window.location.reload(false);
            });
        }
        else
        {
            let id_event = searchParams.get('Id');
            let user_id = window.sessionStorage.getItem("user_id");
            const e = {
                id_event : id_event,
                user_id : user_id,
            };

            axios.post(`http://localhost:8080/eventsenrollment/add`, e)
            .then(res => {
                console.log(res);
            })

            window.location.reload(false);
        }

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
                <div className="row center event-page-top">
                    <div className="col-md-12">
                        <h2> Event : {name} </h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={img} alt="" className="event-photo"/>
                        </div>
                        <div className="col-md-8">
                            <p>Type: {type}</p>
                            <p>Organisation: {organisation}</p>
                            <p>Current number of volunteers: {volunteers}</p>
                            <p>Start Date: {start}</p>
                            <p>End Date: {end}</p>
                            <p>Description: {description}</p>
                            <p>Contact Info: {contact}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-2"></div>
                    <div className="col-md-2"></div>
                    {admin == "true" &&
                        <div className="col-md-2"><a href={edit}><button className="profil-button">Edit</button></a></div>
                    }
                    {join === true &&
                        <div className="col-md-2"><button className="profil-button" onClick={joinEvent}>Unjoin Event</button></div>
                    }
                    {join === false &&
                        <div className="col-md-2"><button className="profil-button" onClick={joinEvent}>Join Event</button></div>
                    }
                    <div className="col-md-2"></div>
                </div>
            </section>
        </div>
    );
}

export default EventPage;