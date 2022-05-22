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
    const [nickname, setNickname] = useState("");
    const [admin, setAdmin] = useState("");

    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const evnts = [];

    axios.get(`http://localhost:8080/users/`+window.sessionStorage.getItem("user_id"))
    .then(res => {
        if(res.data.user_metadata.admin === "true")
        {
            setAdmin("true");
        }
    });

    useEffect(() => {
        if(window.sessionStorage.getItem("user_id") === null)
        {
            navigate("/");
        }

        axios.get(`http://localhost:8080/users/` + window.sessionStorage.getItem("user_id"))
        .then(res => {
            setNickname(res.data.nickname);
        });

        axios.get(`http://localhost:8080/events`)
        .then(res => {
            const event = res.data;
            
            for(let i = 0; i < event.length; i++)
            {
                evnts.push(<Evnt
                    id={event[i].id}
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

    const submitFilter = async (event) => {
        event.preventDefault();
        let e = events;
        let evs = []
        if(type !== "")
        {
            for(let i = 0; i<e.length; i++)
            {
                
                if(e[i].props.type === type)
                {
                    evs.push(e[i])
                }
            }
        }
        console.log(e);
        setEvents(evs);
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
                            {admin == "true" &&
                                <a href="http://localhost:3000/AddEvent">Add Events</a>
                            }
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
            <section>
                <div className="row">
                    <div className="col-md-2 center filter-section">
                        <form>
                            <p>Start Date</p>
                            <input type="date" value={startdate} onChange={(e) => setStartdate(e.target.value)}/>
                            <p>End Date</p>
                            <input type="date" value={enddate} onChange={(e) => setEnddate(e.target.value)}/>
                            <p>Event Type</p>
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="Types">Select Type</option>
                                <option value="Charity">Charity</option>
                                <option value="Medical">Medical</option>
                                <option value="Refugees">Refugees</option>
                                <option value="Children">Children</option>
                                <option value="Animals">Animals</option>
                            </select>
                            <br/>
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
                            </div>
                            {(() => {
                                const options = [];
                                let e = events
                                let evs = []
                                if(type !== "")
                                {
                                    for(let i = 0; i<e.length; i++)
                                    {
                                        
                                        if(e[i].props.type === type)
                                        {
                                            evs.push(e[i])
                                        }
                                    }
                                }
                                if(type === "" && startdate === "" && enddate === "")
                                {
                                    for(let i = 0; i<e.length; i++)
                                    {
                                        evs.push(e[i])
                                    }
                                }
                                return evs;
                            })()}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const Evnt = ({ id, img, name, type, startdate, enddate, description}) => {
    //console.log(props)
    //const { img, title, author } = props
    let link = "http://localhost:3000/EventPage?Id=" + id
    return (
        <div>
            <a href={link}>
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