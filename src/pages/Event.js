import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

import '../css/bootstrap.min.css';
import '../css/style.css';

import profile from '../assets/profile.png';
import dummy from '../assets/dummy-event.jpg';

const Event = () => {

    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");
    const [type, setType] = useState("");

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const evnts = [];

    useEffect(() => {
        if(window.sessionStorage.getItem("user_id") === null)
        {
            navigate("/");
        }
        axios.get(`http://localhost:8080/events`)
        .then(res => {
            const event = res.data;
            
            for(let i = 0; i < event.length; i++)
            {
                evnts.push(<Evnt
                    img={event[i].image}
                    name={event[i].name}
                    startdate={event[i].startdate}
                    type={event[i].type}
                    enddate={event[i].enddate}
                    description={event[i].description}
                />)
            }
            setEvents(evnts);
        });
    }, []);

    const submitFilter = (event) => {
        event.preventDefault();
        let e = events;
        if(type !== "")
        {
            for(let i = 0; i<e.length; i++)
            {
                if(e[i].props.type !== type)
                {
                    e = e.splice(i, 1);
                }
            }
        }
        console.log(e);
        setEvents(e);
        
    }

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
            <section>
                <div className="row">
                    <div className="col-md-2 center filter-section">
                        <form onSubmit={submitFilter}>
                            <p>Start Date</p>
                            <input type="date" value={startdate} onChange={(e) => setStartdate(e.target.value)}/>
                            <p>End Date</p>
                            <input type="date" value={enddate} onChange={(e) => setEnddate(e.target.value)}/>
                            <p>Event Type</p>
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="Charity">Charity</option>
                                <option value="Medical">Medical</option>
                                <option value="Refugees">Refugees</option>
                                <option value="Children">Children</option>
                                <option value="Animals">Animals</option>
                            </select>
                            <br/>
                            <button className="profil-button">Filter</button>
                        </form>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="h2-events">Events</h2>
                            </div>
                        </div>
                        <div className="container event-text">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={dummy} alt="" className="event-photo"/>
                                </div>
                                <div className="col-md-8">
                                    <p>Name : Event</p>
                                    <p>Type : Event</p>
                                    <p>Start Date : Event</p>
                                    <p>End Date : Event</p>
                                    <p>Description : Event</p>
                                </div>
                            </div>
                            {events}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const Evnt = ({ img, name, type, startdate, enddate, description}) => {
    //console.log(props)
    //const { img, title, author } = props
    return (
        <div>
            <a href="http://localhost:3000/EventPage?Id=1">
                <div className="row space-row">
                    <div className="col-md-4">
                        <img src={img} alt="" className="event-photo"/>
                    </div>
                    
                    <div className="col-md-8">
                        <p>Name : {name}</p>
                        <p>Type : {type}</p>
                        <p>Start Date : {startdate}</p>
                        <p>End Date : {enddate}</p>
                        <p>Description : {description}</p>
                    </div>
                </div>
            </a>
        </div>
    )
  }

export default Event;