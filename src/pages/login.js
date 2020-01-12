import React, {useState} from 'react';
import './loginStyle.css';

import {api} from '../services/api'

import logo from '../assets/logo.svg'

export default function Login ({history}){
    const [username, setUsername] = useState('');
    
    async function enviaForm(event){
        event.preventDefault();
        
        const response = await api.post('/devs', {
            username,

        });

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    };
    
    return(
        <div className = "login-container">
            <form onSubmit = {enviaForm}>
            <img src = {logo} alt = 'Tindev' />
            <input 
                type = 'text'
                placeholder = 'Digite seu usuário'
                value = {username}   
                onChange = {(event)=>{setUsername(event.target.value)}}
            />
            <button>ENVIAR</button>
            </form>
        </div>        
    )
};