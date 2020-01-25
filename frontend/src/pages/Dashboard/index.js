import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css'

function Dashboard() {
    
    const [spot, setSpots] = useState([]);
    
    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data);
            // console.log(response.data);
        }

        loadSpots();

    }, []); 

    return (
        <>
            <ul className="spot-list">
                { spot.map(spot => (
                    <li key = { spot._id }>
                        <header style = {{ backgroundImage: `url(${spot.thumbnail_url})` }}> </header>
                        <strong> {spot.company} </strong>
                        <span> {spot.price ? `${spot.price}/dia` : 'GRATUITO' }</span>
                    </li>
                ))}
            </ul>
            <Link to = "/new">
                <button className = "btn">Cadastrar novo spot</button>
            </Link>
        </>
    );
}

export default Dashboard;